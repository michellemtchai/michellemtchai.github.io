// central location to define routes
module.exports = (app) => {
    let {
        ApplicationController,
        ProjectsController,
        TagsController,
        CategoriesController,
        TechnologiesController,
        DataController,
    } = app.shared.controllers;

    /**
     *
     * You can start defining your routes below.
     *
     */
    app.router.get('/', ApplicationController.index);

    app.router.get('/projects', ProjectsController.index);
    app.router.get('/projects/:id', ProjectsController.show);
    if (process.env.APP_ENV === 'development') {
        app.router.post('/projects', ProjectsController.create);
        app.router.put(
            '/projects/:id',
            ProjectsController.update
        );
        app.router.delete(
            '/projects/:id',
            ProjectsController.destroy
        );
    }

    app.router.get('/tags', TagsController.index);
    if (process.env.APP_ENV === 'development') {
        app.router.post('/tags', TagsController.create);
        app.router.delete('/tags/:id', TagsController.destroy);
    }

    app.router.get('/categories', CategoriesController.index);
    app.router.get('/categories/:id', CategoriesController.show);
    if (process.env.APP_ENV === 'development') {
        app.router.post(
            '/categories',
            CategoriesController.create
        );
        app.router.put(
            '/categories/:id',
            CategoriesController.update
        );
        app.router.delete(
            '/categories/:id',
            CategoriesController.destroy
        );
    }

    app.router.get(
        '/technologies',
        TechnologiesController.index
    );
    if (process.env.APP_ENV === 'development') {
        app.router.post(
            '/technologies',
            TechnologiesController.create
        );
        app.router.put(
            '/technologies/:id',
            TechnologiesController.update
        );
        app.router.delete(
            '/technologies/:id',
            TechnologiesController.destroy
        );
    }

    //The 404 Route (ALWAYS Keep this as the last route)
    app.router.get('*', ApplicationController.notFound);
};
