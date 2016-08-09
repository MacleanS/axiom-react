import loaderUtils from 'loader-utils';
import { AXIOM_SASS_VARIABLE_FORMAT } from './_config';

module.exports = function sassVariableOverrideLoader(source) {
  this.cacheable && this.cacheable();

  const webpackRemainingChain = loaderUtils.getRemainingRequest(this).split('!');
  const filename = webpackRemainingChain[webpackRemainingChain.length - 1];
  const { location } = loaderUtils.parseQuery(this.query);

  if (!location || !AXIOM_SASS_VARIABLE_FORMAT.test(filename)) {
    return source;
  }

  this.addDependency(location);

  return `
    ${source}

    const userVars = require('${location}');
    module.exports = Object.keys(module.exports || {}).reduce((vars, key) => {
      return {
        ...vars,
        [key]: (userVars[key] || module.exports[key]),
      };
    }, {});
  `;
}