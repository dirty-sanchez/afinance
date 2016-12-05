"use strict";

const WorkLogService = {
  add: (req) => {
    const username = req.session.username;
    const dt = new Date();
    let operation;
    const operationMap = {
      'GET': 'запросил',
      'POST': 'добавил',
      'PUT': 'обновил',
      'DELETE': 'удалил'
    };
    const resourceData = req.path.split('/');// expected something like "/donor/37"
    let resource = '',
      data;
    const resourceMap = {
      'document': 'документ',
      'division': 'дивизион',
      'position': 'позиция',
    };
    let msg = '';

    console.log('asdfasdfadsfadsfasdf')
    console.dir(resourceData)
    if (resourceData.length > 1) {

      if (resourceData[0] === 'login') {
        switch (resourceData[1]) {
          case 'login':
          case 'check':
            operation = 'залогинился в системе';
            break;
          case 'logout':
            operation = 'вышел из системы';
            break;
        }
      } else {
        if (resourceMap[resourceData[0]]) {
          if (req.method in ['PUT', 'DELETE']) {
            resource = 'ресурс "' + resourceMap[resourceData[0]] + '" с ID ' + resourceData[1];
          } else if (req.method === 'POST') {
            resource = 'новый ресурс "' + resourceMap[resourceData[0]] + '"';
          }

          if (req.method in ['PUT', 'POST']) {
            data = req.body;
          }
        }
      }
    } else {
      resource = req.path;
      data = req.body;
    }

    operation = (operationMap[req.method])?  operationMap[req.method] : req.method;
    msg = ['пользователь', username, operation, resource].join(' ');

    console.log('[' +  dt.toISOString() + '] ' + msg);
    WorkLog.create({message: msg, data: data}).then(() => true);
  },
};

module.exports = WorkLogService;
