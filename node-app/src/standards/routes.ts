import { Router } from 'express';
import { getMiddleware } from '../middlewares/checkAuth';

export default class StandardRoutes {
    bypass = {
        create: false,
        update: false,
        getItemById: false,
        getCollection: false,
        delete: false,
    };
    private modelName: string;
    private modelService: any;

    constructor(modelName, modelService) {
        this.modelName = modelName;
        this.modelService = modelService;
    }

    public router(router: Router): Router {
        if (!router) {
            throw new Error('"router" is not defined.');
        }

        // submit
        this.create(router, this.bypass['create']);

        // get item by id
        this.getItemById(router, this.bypass['getItemById']);

        // get collection
        this.getCollection(router, this.bypass['getCollection']);

        // update
        this.update(router, this.bypass['update']);

        // delete
        this.delete(router, this.bypass['delete']);

        return router;
    }

    private create = (router, bypass = false) => {
        router.post(`/${this.modelName}`, getMiddleware(bypass), (req, res) => {
            this.resHandling(res, this.modelService.create(req.body, req['auth']));
        });
    }

    private getItemById = (router, bypass = false) => {
        router.get(`/${this.modelName}/:id`, getMiddleware(bypass), (req, res) => {
            this.resHandling(res, this.modelService.fetch(req.params.id, req.query));
        });
    }

    private getCollection = (router, bypass = false) => {
        router.get(`/${this.modelName}`, getMiddleware(bypass), (req, res) => {
            const queryModel = req.query.queryModel || '{}';
            this.resHandling(res, this.modelService.fetchAll(JSON.parse(queryModel)));
        });
    }

    private update = (router, bypass = false) => {
        router.put(`/${this.modelName}/`, getMiddleware(bypass), (req, res) => {
            this.resHandling(res, this.modelService.update(req.body, req['auth']));
        });
    }

    private delete = (router, bypass = false) => {
        router.delete(`/${this.modelName}/:id`, getMiddleware(bypass), (req, res) => {
            this.resHandling(res, this.modelService.delete(req.params.id));
        });
    }

    private resHandling(res, func) {
        try {
            func.then((result) => {
                res.status(result.status).json(result);
            }).catch((result) => {
                res.status(result.status).json(result);
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = StandardRoutes;
