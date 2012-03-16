/* <border-radius-single>
 *
 * CSS3:  [ <length> | <percentage> ]{1,2}
 */
var base = require('./base');
var length = require('./length');
var percentage = require('./percentage');
var util = require('../../util');
var validate = require('./validate');

var BorderRadiusSingle = base.baseConstructor();

util.extend(BorderRadiusSingle.prototype, base.base, {
	name: "border-radius-single"
});

exports.parse = function (unparsedReal, parser, container) {
	var brs = new BorderRadiusSingle(parser, container, unparsedReal);
	var unparsed = unparsedReal.clone();
	brs.debug('parse', unparsedReal);

	if (unparsed.isContent('inherit')) {
		brs.add(unparsed.advance());
		brs.unparsed = unparsed;
		return brs;
	}

	var result = unparsed.canMatch([ length, percentage ], brs);
	
	if (! result) {
		return null;
	}

	validate.call(result, 'positiveValue');
	brs.add(result);
	unparsed = result.unparsed;

	result = unparsed.canMatch([ length, percentage ], brs);

	if (result) {
		validate.call(result, 'positiveValue');
		brs.add(result);
		unparsed = result.unparsed;
	}

	brs.unparsed = unparsed;
	validate.call(brs, 'minimumCss', 3);
	return brs;
};