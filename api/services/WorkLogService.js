"use strict";

const WorkLogService = {

  logRequest: (req, res) => {
    const dt = new Date();
    let operation;
    const resourceData = req.path.split('/');// expected something like "/donor/37"
    let resource = '',
      data;
    let logMsgStruct;
    let msgFactory;

    resourceData.shift();
    msgFactory = WorkLogService.getMsgBuilderFor(req, res);
    logMsgStruct = msgFactory.makeMsg();//['пользователь', username, operation, resource].join(' ');
    console.log('[' +  dt.toISOString() + '] ' + logMsgStruct.message);
    WorkLog.create({message: logMsgStruct.message, data: JSON.stringify(logMsgStruct.data)})
      .then(() => true);
  },

  getMsgBuilderFor: (req, res) => {
    const resourceData = req.path.split('/');// expected something like "/donor/37"
    resourceData.shift();
    if (resourceData.length > 0) {
      if (resourceData[0] === 'login') {
        return WorkLogService.getLoginMsgBuilder(req, res);
      }
    }

    return WorkLogService.getStdMsgBuilder(req, res);
  },

  getLoginMsgBuilder:(req, res) => {
    const username = req.session.username;

    return {
      makeMsg: () => {
        let logMsgStruct = {
          message: '',
          data: {}
        };

        if (res.statusCode === 200) {
          logMsgStruct.message = 'пользователь "' + username + '" успешно вошел в систему';
        } else {
          logMsgStruct.message = 'неудачная попытка входа под пользователем "' + username + '"';
        }

        return logMsgStruct;
      }
    };
  },

  getStdMsgBuilder: (req, res) => {
    const username = req.session.username;
    const operationMap = {
      'GET': 'запросил',
      'POST': 'добавил',
      'PUT': 'обновил',
      'DELETE': 'удалил'
    };
    const resourceMap = {
      'document': 'документ',
      'documenttype': 'тип документа',
      'division': 'дивизион',
      'position': 'позиция',
    };
    const resourceData = req.path.split('/');// expected something like "/donor/37"

    resourceData.shift();

    return {
      makeMsg: function() {
        const operation = operationMap[req.method] || ' запросил "' + req.method + '" ';
        let logMsgStruct = {
          message: 'пользователь "' + username + '" ' + operation + ' ',
          data: {}
        };

        if ((resourceData.length > 1 || req.method === 'POST') && resourceMap[resourceData[0]]) {
          if (['PUT', 'DELETE'].indexOf(req.method) !== -1) {
            logMsgStruct.message += 'ресурс "' + resourceMap[resourceData[0]] + '" с ID ' + resourceData[1];
          } else if (req.method === 'POST') {
            logMsgStruct.message += 'новый ресурс "' + resourceMap[resourceData[0]] + '"';
          } else {
            logMsgStruct.message = 'пользователь "' + username + '" запросил ' + req.method + ' ' + req.path;
            logMsgStruct.data = req.body;
          }

          if (['PUT', 'POST'].indexOf(req.method)) {
            logMsgStruct.data = req.body;
          }
        } else {
          logMsgStruct.message += req.path;
          logMsgStruct.data = req.body;
        }

        return logMsgStruct;
      }
    }
  },

  isNeedToLogRequest: (req) => {
    const REQUESTS_TO_LOG = [
      'POST:login',
      'POST:document',
      'POST:documenttype',
      'POST:division',
      'POST:position',
      'POST:positiongroup',
      'POST:user',
      'POST:contragent',
      'POST:contragentgroup ',

      'PUT:document',
      'PUT:documenttype',
      'PUT:division',
      'PUT:position',
      'PUT:positiongroup',
      'PUT:user',
      'PUT:contragent',
      'PUT:contragentgroup',

      'DELETE:document',
      'DELETE:documenttype',
      'DELETE:division',
      'DELETE:position',
      'DELETE:positiongroup',
      'DELETE:user',
      'DELETE:contragent',
      'DELETE:contragentgroup',
    ];
    const resourceData = req.path.split('/');// expected something like "/donor/37"

    resourceData.shift();
    return resourceData.length > 0 && REQUESTS_TO_LOG.indexOf([req.method, resourceData[0]].join(':')) !== -1;
  }
};

module.exports = WorkLogService;
