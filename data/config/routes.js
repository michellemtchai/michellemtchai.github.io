// central location to define routes
module.exports = (app) => {
    let {
        ApplicationController,
        ProjectsController,
        TagsController,
        CategoriesController,
        TechnologiesController,
    } = app.shared.controllers;

    /**
     *
     * You can start defining your routes below.
     *
     */
    app.router.get('/home', ApplicationController.index);

    app.router.get('/projects', ProjectsController.index);
    app.router.get('/projects/:id', ProjectsController.show);
    app.router.get(
        '/projects/search/:search',
        ProjectsController.search
    );
    app.router.get('/categories', CategoriesController.index);

    if (process.env.DATA_BACKEND_ENV === 'development') {
        app.router.post('/projects', ProjectsController.create);
        app.router.put(
            '/projects/:id',
            ProjectsController.update
        );
        app.router.delete(
            '/projects/:id',
            ProjectsController.destroy
        );

        app.router.get('/tags', TagsController.index);
        app.router.post('/tags', TagsController.create);
        app.router.delete('/tags/:id', TagsController.destroy);

        app.router.get(
            '/categories/:id',
            CategoriesController.show
        );
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

        app.router.get(
            '/technologies',
            TechnologiesController.index
        );
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
