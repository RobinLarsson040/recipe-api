const { getIngredientsByAutoComplete, getIngredientByName, addRecipe, getRecipes, getRecipesByCategory } = require('./mongodb')
module.exports = class Routes {
    constructor(app) {
        this.app = app;
        this.setRoutes();
    }

    setRoutes() {
        this.app.get('/ingredients/auto/:text', (req, res) => {
            if (req.params.text.length > 1) {
                getIngredientsByAutoComplete(req.params.text).then((result) => {
                    res.json(result)
                }).catch((err) => {
                    res.json(err)
                });
            } else {
                res.send('Provide more than two characters for autocomplete')
            }
        })

        this.app.get('/ingredients/:name', (req, res) => {
            getIngredientByName(req.params.name).then((result) => {
                res.json(result)
            }).catch(() => {
                res.json(err)
            })
        })

        this.app.post('/recipes', (req, res) => {
            let recipe = req.body;
            addRecipe(recipe).then((result) => {
                res.send('Succesfully added recipe')
            }).catch(() => {
                res.send('Failed to add recipe')
            })
        })

        this.app.get('/recipes', (req, res) => {
            getRecipes().then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json(err)
            })
        })

        this.app.get('/recipes/:category', (req, res) => {
            getRecipesByCategory(req.params.category).then((result) => {
                res.json(result)
            }).catch(() => {
                res.json(err)
            })
        })

    }

}