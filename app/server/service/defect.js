/**
 * Created by YouHan on 2016/9/19.
 */
var logger = require('./../utils/logger');
var dao = require('./../model/defect');


exports.add = function (data) {
    if (!data.story_id) {
        return new Promise(function (resolve, reject) {
            reject('no story id');
        });
    } else {
        return dao.add(data)
            .catch(function (error) {
                logger.error(error);
                throw new Error('error happen when save defect');
            });
    }
};

exports.get = function (id) {
    if (!id) {
        return new Promise(function (resolve, reject) {
            reject('no defect id');
        });
    } else {
        return dao.get(id).catch(function (error) {
            logger.error(error);
            throw new Error('error happen when save defect');
        });
    }

};

exports.update = function (data) {
    if (!data.id) {
        return new Promise(function (resolve, reject) {
            reject('no defect id');
        });
    } else {
        return dao.get(data.id)
            .then(function (oriData) {
                if (oriData && oriData.length == 1) {
                    var temp = oriData[0];
                    if (data.title != null) temp.title = data.title;
                    if (data.desc != null) temp.desc = data.desc;
                    if (data.file != null) temp.file = data.file;
                    if (data.status != null) temp.status = data.status;
                    if (data.reopen != null) temp.reopen = data.reopen;
                    if (data.reopen_reason != null) temp.reopen_reason = data.reopen_reason;
                    if (data.owner_id != null) temp.owner_id = data.owner_id;
                    if (data.submit_id != null) temp.submit_id = data.submit_id;
                    if (data.story_id != null) temp.story_id = data.story_id;
                    return dao.update(temp);
                } else {
                    logger.error('can get by id');
                    throw new Error();
                }
            })
            .catch(function (error) {
                logger.error(error);
                throw new Error('error happen when update defect');
            });
    }
};

exports.del = function (id) {
    if (!id) {
        return new Promise(function (resolve, reject) {
            reject('no defect id');
        });
    } else {
        return dao.del(id)
            .catch(function (error) {
                logger.error(error);
                throw new Error('error happen when del defect');
            });
    }
};


exports.delByStoryId  = function(id) {
    return dao.delByStoryId(id);
};

exports.getAll = function (storyId) {
    return dao.getAll(storyId).catch(function (error) {
        logger.error(error);
        throw new Error('error happen when get defects');
    });
};