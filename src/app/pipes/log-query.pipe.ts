import { PipeTransform, Pipe } from '@angular/core';
import * as _ from 'lodash';

import { Log } from '../models/Log';
import { LogLevel } from '../models/enums/LogLevel';
import { LogChannel } from '../models/enums/LogChannel';

@Pipe({
  name: 'logQuery'
})
export class LogQueryPipe implements PipeTransform {

  public transform(
    logs: Log[],
    term: string,
    queryBy: string,
    orderBy: string,
    channel: string
  ): Log[] {
    logs = (logs || []);
    logs = this.filterLogsByChannel(logs, channel);
    logs = this.queryLogsByTerm(logs, term, queryBy);
    logs = this.orderLogs(logs, orderBy);
    return logs;
  }

  private filterLogsByChannel(logs: Log[], channel: string): Log[] {
    return logs.filter(x =>
          LogChannel.getLowercaseName(x.channel) == channel);
  }

  private queryLogsByTerm(logs: Log[], term: string, queryBy: string): Log[] {
    if (term) {
      // Query by log level
      if (queryBy == 'level') {
        return logs.filter(x =>
          new RegExp(term, 'gi').test(LogLevel.getName(x.level)));
      }
      // Query by description & source
      return logs.filter(x => new RegExp(term, 'gi').test(x[queryBy]));
    }
    return logs;
  }

  private orderLogs(logs: Log[], orderBy: string): Log[] {
    if (orderBy == 'frequency') {
      return this.orderByEventCount(logs);
    }
    return this.orderByLevel(logs);
  }

  private orderByEventCount(logs: Log[]): Log[] {
    return _.orderBy(logs, ['eventCount'], ['desc']);
  }

  private orderByLevel(logs: Log[]): Log[] {
    let debugLogs = this.getLogsByLogLevel(logs, LogLevel.Debug);
    let warningLogs = this.getLogsByLogLevel(logs, LogLevel.Warning);
    let errorLogs = this.getLogsByLogLevel(logs, LogLevel.Error);
    return debugLogs.concat(warningLogs, errorLogs);
  }

  private getLogsByLogLevel(logs: Log[], level: LogLevel): Log[] {
    return _.filter(logs, { level: level });
  }
}