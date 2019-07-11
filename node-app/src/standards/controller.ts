import mongoose from 'mongoose';
import Promise from 'promise';
import IMongooseQueryModel from '../interfaces/mongoose/mongooseQueryModel.interface';
import QueryModel from '../models/query.model';

export default class StandardController {
    private modelName: string;
    private model: mongoose.Model<mongoose.Document, {}> = null;

    constructor(modelName: string) {
        this.modelName = modelName;
        // this.model = require(`../models/${this.modelName}.model`);
        import(`../models/${this.modelName}.model`).then(module => {
            this.model = module.default;
        });
    }

    // CRUD functions - create, fetch, fetchAll, update, delete

    public create(model, auth: any = {}) {
        if (auth.isAuth) {
            model.audit = { updatedBy: auth.user.username, createdBy: auth.user.username };
        }
        // const Product = require('../models/product.model');
        // const newProduct = new Product();
        // newProduct.save().then((data) => {

        // });
        const newModel = new this.model(model);
        return new Promise((resolve, reject) => {
            newModel
                .save()
                .then(data => {
                    const result = {
                        status: 201,
                        message: `${this.modelName} created successfully!`,
                        data
                    };
                    resolve(result);
                })
                .catch(error => {
                    const result = {
                        status: 500,
                        message: `${this.modelName} failed to create!`,
                        error: error.toString()
                    };
                    reject(result);
                });
        });
    }

    public fetch(id, query) {
        return new Promise((resolve, reject) => {
            let includes = [];

            if (query['includes']) {
                includes = query['includes'].split(',');
            }

            let func = this.model.findById(id);

            if (includes.length > 0) {
                includes.forEach(include => {
                    func = func.populate(include);
                });
            }

            func.then(data => {
                if (data == null) {
                    throw new Error('Product not found!');
                }

                const result = {
                    status: 200,
                    message: `${this.modelName} fetched successfully!`,
                    data
                };
                resolve(result);
            }).catch(error => {
                const result = {
                    status: 500,
                    message: `${this.modelName} not found!`,
                    error: error.toString()
                };
                reject(result);
            });
        });
    }

    public fetchAll(queryModel) {
        return new Promise((resolve, reject) => {
            const { conditions, options } = new QueryModel(queryModel).getQuery();

            const sortQuery = (options.sortDirection === 0 ? '' : '-') + options.sort;

            this.model.countDocuments(conditions).then((count) => {
                let func = this.model
                    .find(conditions)
                    .sort(sortQuery)
                    .skip(options.skip)
                    .limit(options.limit);

                if (queryModel.includes && queryModel.includes.length > 0) {
                    queryModel.includes.forEach((include) => {
                        func = func.populate(include);
                    });
                }

                func.then((data) => {
                    const result = {
                        status: 200,
                        message: `${this.modelName} fetched all successfully!`,
                        data,
                        totalItems: count,
                        currentPage: queryModel.currentPage,
                        totalPages: Math.ceil(count / queryModel.pageSize),
                    };
                    resolve(result);
                });
            });
        });
    }

    public update(model, auth) {
        return new Promise((resolve, reject) => {
            this.model
                .findById(model._id)
                .then((doc) => {
                    if (doc == null) {
                        throw new Error(`${this.modelName} not found!`);
                    }

                    // model.audit.updatedBy = auth.user.username;
                    // model.audit.updatedDate = new Date();

                    doc.updateOne(this._getUpdateConditions(model, auth)).then(() => {
                        this.model.findById(model._id).then((data) => {
                            const result = {
                                status: 201,
                                message: `${this.modelName} updated successfully!`,
                                data,
                            };
                            resolve(result);
                        });
                    });
                })
                .catch((error) => {
                    const result = {
                        status: 500,
                        message: `${this.modelName} failed to update!`,
                        error: error.toString(),
                    };
                    reject(result);
                });
        });
    }

    public delete(id) {
        return new Promise((resolve, reject) => {
            this.model
                .findByIdAndDelete(id)
                .then((data) => {
                    if (data == null) {
                        throw new Error(`${this.modelName} not found!`);
                    }

                    const result = {
                        status: 200,
                        message: `${this.modelName} deleted successfully!`,
                    };
                    resolve(result);
                })
                .catch((error) => {
                    const result = {
                        status: 500,
                        message: `${this.modelName} failed to delete!`,
                        error: error.toString(),
                    };
                    reject(result);
                });
        });
    }

    private _getUpdateConditions(model, auth) {
        const updateModel: IMongooseQueryModel = { $set: model };

        if (model.hasOwnProperty('audit')) {
            if (auth.isAuth) {
                console.log(auth.user);
                model.audit.updatedBy = auth.user.username;
            }

            Object.keys(model.audit).forEach((key) => (updateModel.$set[`audit.${key}`] = model.audit[key]));
            delete updateModel.$set.audit;
            delete updateModel.$set['audit.updatedDate'];
            updateModel.$currentDate = { 'audit.updatedDate': { $type: 'date' } };
        }

        return updateModel;
    }
}
