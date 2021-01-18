/**
 * @description utils controller
 */

const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

// 存储路径
const DIST_FOLDER_PATH = path.join(__dirname,'..','..','uploadFiles')
// 文件最大体积1M
const MAX_SIZE = 1024 * 1024 * 1024

// 确保目录存在
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})
/**
 * 保存文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件大小
 * @param {string} filePath 文件路径 
 */
async function saveFile({name, type, size, filePath}) {
    if (size > MAX_SIZE) {
        // 超过最大空间,则先删除,然后返回一个错误model
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    // 移动文件
    // 防止重名
    const fileName = Date.now() + '.' + name
    // 文件目的地
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
    // 移动到目标路径
    await fse.move(filePath, distFilePath)

    // 返回信息
    return new SuccessModel({
        url: '/' + fileName
    })
}

module.exports = {
    saveFile
}