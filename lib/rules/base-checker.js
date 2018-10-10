class BaseChecker {
  constructor(reporter) {
    this.reporter = reporter
  }

  error(ctx, ruleId, message) {
    this.reporter.error(ctx, ruleId, message)
  }

  errorAt(line, column, ruleId, message) {
    this.reporter.errorAt(line, column, ruleId, message)
  }

  warn(ctx, ruleId, message) {
    this.reporter.warn(ctx, ruleId, message)
  }
}

module.exports = BaseChecker
