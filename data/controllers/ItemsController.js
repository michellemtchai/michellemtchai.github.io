const Controller = require('../classes/Controller');
const common = require('../helpers/common');

class ItemsController extends Controller {
    Item = this.models['Item'];

    /**
     * @api {get} /items Get all items
     * @apiVersion 1.0.0
     * @apiGroup Item
     *
     * @apiSuccess {String} name Name of item.
     * @apiSuccess {Date} date Time this item was made.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     [{
     *       "name": "cats",
     *       "date": "1970-01-01T00:00:00.000Z"
     *     }]
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "msg": "{error message}"
     *     }
     */
    index = (req, res) => {
        this.Item.renderAll(res, {
            sort: {
                created: -1
            },
            select: {
                __v: 0
            }
        });
     }

    /**
     * @api {get} /items/:id Get item with :id
     * @apiVersion 1.0.0
     * @apiGroup Item
     *
     * @apiParam {String} id ID of item.
     * @apiParamExample {json} Request-Example:
     *     {
     *       "id": "60288e070bf0ed00182b8883"
     *     }
     *
     * @apiSuccess {String} name Name of item.
     * @apiSuccess {Date} date Time this item was made.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "name": "cats",
     *       "date": "1970-01-01T00:00:00.000Z"
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "msg": "{error message}"
     *     }
     */
    show = (req, res) => {
        this.Item.renderOneWithId(res, req.params.id, {
            __v: 0
        });
    }

    /**
     * @api {post} /items Creates new item
     * @apiVersion 1.0.0
     * @apiGroup Item
     *
     * @apiParam {String} name Name of item.
     * @apiParamExample {json} Request-Example:
     *     {
     *       "name": "cats"
     *     }
     *
     * @apiSuccess {String} name Name of item.
     * @apiSuccess {Date} date Time this item was made.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "name": "cats",
     *       "date": "1970-01-01T00:00:00.000Z"
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "msg": "{error message}"
     *     }
     */
    create = (req, res) => {
        let required = ['name'];
        let createItem = ()=>{
            let permitted = common.permit(req.body, ['name']);
            this.Item.createOne(
                res, i=>res.json(i), permitted
            );
        };
        common.requiredParams(req.body, res, required, createItem);
    }

    /**
     * @api {post} /items/:id Updates item with :id
     * @apiVersion 1.0.0
     * @apiGroup Item
     *
     * @apiParam {String} name Name of item.
     * @apiParamExample {json} Request-Example:
     *     {
     *       "name": "cats"
     *     }
     *
     * @apiSuccess {String} name Name of item.
     * @apiSuccess {Date} date Time this item was made.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "name": "cats",
     *       "date": "1970-01-01T00:00:00.000Z"
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "msg": "{error message}"
     *     }
     */
    update = (req, res) => {
        let required = ['name'];
        let next = i=>res.json(i);
        let updateItem = ()=>{
            this.Item.update(res, next, req.params.id, (model)=>{
                model.name = req.body.name;
                return model;
            });
        };
        common.requiredParams(req.body, res, required, updateItem);
    }

    /**
     * @api {get} /items Deletes item with :id
     * @apiVersion 1.0.0
     * @apiGroup Item
     *
     * @apiParam {String} id ID of item.
     * @apiParamExample {json} Request-Example:
     *     {
     *       "id": "60288e070bf0ed00182b8883"
     *     }
     *
     * @apiSuccess {String} name Name of item.
     * @apiSuccess {Date} date Time this item was made.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "name": "cats",
     *       "date": "1970-01-01T00:00:00.000Z"
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "msg": "{error message}"
     *     }
     */
    destroy = (req, res) => {
        this.Item.removeById(res, i=>res.json(i), req.params.id);
    }
};

module.exports = ItemsController;
