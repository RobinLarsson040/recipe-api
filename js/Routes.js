const { getIngredientsByAutoComplete, getIngredientByName, addRecipe } = require('./mongodb')
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
            console.log(req.body)
            addRecipe(recipe);
        })

    }

}