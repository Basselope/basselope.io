'use strict';

const nlp = require('nlp_compromise');
nlp.plugin(require('simple_english'));
nlp.plugin(require('nlp-locale'));

const _ = require('lodash')

const struct = ('./api_struct.js');