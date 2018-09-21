const test = require('tape');
const { GregorianDate } = require('../..');

test('GregorianDate', ({ test, end })=>{
  test('construct', ({ equal, end })=>{
    const instance = new GregorianDate(1976, 11, 18);

    equal(typeof instance, 'object');
    equal(instance instanceof GregorianDate, true);
    equal(instance.year, 1976);
    equal(instance.month, 11);
    equal(instance.day, 18);
    equal(instance.hour, undefined);
    equal(instance.minute, undefined);
    equal(instance.second, undefined);
    equal(instance.millisecond, undefined);
    equal(instance.nanosecond, undefined);
    equal(instance.toString(), '1976-11-18');

    end();
  });

  test('fromString', ({ equal, throws, end })=>{
    const one = GregorianDate.fromString('1976-11-18');
    equal(one instanceof GregorianDate, true);
    equal(one.year, 1976);
    equal(one.month, 11);
    equal(one.day, 18);

    throws(()=>{
      GregorianDate.fromString('1976-11-18T15:23:30.450000100');
    });
    throws(()=>{
      GregorianDate.fromString('1976-11-18T15:23:30');
    });
    throws(()=>{
      GregorianDate.fromString('1976-11-18 15:23:30');
    });
    throws(()=>{
      GregorianDate.fromString('1976-11-18T15:23:30.450000100[Europe/Vienna]');
    });
    throws(()=>{
      GregorianDate.fromString('1976-11-18T15:23:30.450000100+01:00');
    });

    end();
  });

  end();
});
