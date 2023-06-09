/*
 * Copyright (C) 2020 Tencent Cloud.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
import { filePath2Base64, pathToBase64 } from './util.js';

/**
 * 选择视频为Base64格式输出
 * @return {Promise<string>} 返回图片的Base64编码
 */
export default async function chooseVideo2Base64() {
  return new Promise(async (resolve, reject) => {
    const [error, res] = await uni.chooseVideo({
      sourceType: ['camera'],
      compressed: true,
      maxDuration: 5,
      count: 1,
      camera: 'front'
    });

    if (error) {
      let msg='核验失败'
      if(error.errMsg=='chooseVideo:fail cancel'){
        msg='取消核验'
      }else if(error.errMsg=='chooseVideo:fail auth deny'){c
        msg='请视频授权后再试'
      }else if(error.errMsg=='chooseVideo:fail no such file or directory'){
        msg='文件不存在'
      }else if(error.errMsg=='chooseVideo:fail the maximum size of the file storage limit is exceeded'){
        msg='文件大小超过限制'
      }else if(error.errMsg=='chooseVideo:fail the maximum number of files storage limit is exceeded'){
        msg='文件数量超过限制'
      }else if(error.errMsg=='chooseVideo:fail the file type not support'){
        msg='文件类型不支持'
      }else if(error.errMsg=='chooseVideo:fail the file choose limit is exceeded'){
        msg='文件选择数量超过限制'
      }
      return reject(new Error(msg));
    }
    // #ifdef H5
    const data = await pathToBase64(res.tempFilePath);
    resolve(data);
    return resolve(res);
    // #endif
    // #ifndef H5
    let video;
    if (res.size > 3 * 1024 * 1024) {
      const [error, result] =await uni.compressVideo({
        src: res.tempFilePath,
        mode: 'high',
        quality: '0.8',
        fps: 30,
        size: 3 *1000 * 1024,
      })
      video= result.tempFilePath;
    }else{
      video = res.tempFilePath;
    }
    // #ifdef MP
    uni.getFileSystemManager().readFile({
      filePath: video,
      encoding: 'base64',
      success: ({ data }) => {
        return resolve(data);
      }
    });
    // #endif
    // #ifndef MP
    const data = await filePath2Base64(video);
    return resolve(data);
    // #endif
    // #endif

  });
}
