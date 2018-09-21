/*
** Copyright (C) 2018 Bloomberg LP. All rights reserved.
** This code is governed by the license found in the LICENSE file.
*/

import { plus, dayOfWeek, dayOfYear, weekOfYear  } from './shared.mjs';
import { pad, spad } from '../strutil.mjs';
import { fromEpoch } from './epoch.mjs';
import { GregorianDateTime } from './gregoriandatetime.mjs';

const DATA = Symbol('data');

export class GregorianDate {
  constructor(years, months, days) {
    const { year, month, day } = plus({}, { years, months, days });
    this[DATA] = { year, month, day };
  }

  get year() { return this[DATA].year; }
  get month() { return this[DATA].month; }
  get day() { return this[DATA].day; }

  get dayOfWeek() { return dayOfWeek(this.year, this.month, this.day); }
  get dayOfYear() { return dayOfYear(this.year, this.month, this.day); }
  get weekOfYear() { return weekOfYear(this.year, this.month, this.day); }

  plus(data) {
    const { year, month, day } = plus(this, data);
    return new GregorianDate(year, month, day);
  }
  with({ year = this.year, month = this.month , day = this.day } = {}) {
    return new GregorianDate(year, month, day);
  }
  withTime(time) {
    return new GregorianDateTime.from(this, time);
  }
  toString() { return this.toDateString(); }
  toJSON() { return this.toString(); }
  toDateString() {
    const { year, month, day } = this;
    return `${spad(year, 4)}-${pad(month, 2)}-${pad(day, 2)}`;
  }
  toWeekDateString() {
    const { year, weekOfYear, dayOfWeek } = this;
    return `${spad(year, 4)}-W${pad(weekOfYear, 2)}-${pad(dayOfWeek, 2)}`;
  }
  toOrdinalDateString() {
    const { year, dayOfYear } = this;
    return `${spad(year, 4)}-${pad(dayOfYear, 3)}`;
  }

  static fromString(string) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(string);
    if (!match) {
      throw new Error(`invalid date-string: ${string}`);
    }
    return new GregorianDate(+match[1], +match[2], +match[3]);
  }
  static fromZonedInstant(instant) {
    const { year, month, day } = fromEpoch(instant.milliseconds, instant.timeZone);
    return new GregorianDate(year, month, day);
  }
};
GregorianDate.prototype[Symbol.toStringTag] = 'GregorianDate';
