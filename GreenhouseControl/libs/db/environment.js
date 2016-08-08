/**
 * http://usejsdoc.org/
 */

var ghConfig = require('../../ghConfig'),
	store = require('../store/environment'),
	environment = require('../environment'),
	log = require('log4js').getLogger('libs.db.environment'),
	send = require('../telegram/send');

exports.get = function(conf, callback){
	try{
		store.read(conf, function(err, docs){
			if(docs != null)
				log.debug("[get] Environment Get: length = " + docs.length);
			
			callback(err, docs);
		});
	} catch(e){
		log.error(e);
		callback(e, null);
	}
};

exports.value = function(conf, callback){
	try{
		log.debug('read environment config : ' + JSON.stringify(conf));
		
		ghConfig.getEnvironmentConfig(null, function(confs){
			log.debug('get environment configs : ' + JSON.stringify(confs));
			
			var doc;
			for(idx in confs){
				doc = confs[idx];
				if(doc.unit == conf.unit && doc.zone == conf.zone)
					break;
			};
			
			log.debug('found env doc : ' + JSON.stringify(doc));
			callback(null, doc);
			
		});
	}catch(e){
		log.error(e);
		callback(e, null);
	}
};

exports.add = function(conf, remainDay){
	try{
		store.add(conf, remainDay);
	}catch(e){
		log.error(e);
	}
}

