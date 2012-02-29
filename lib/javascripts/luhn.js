(function() {
  var Luhn = {

    valid: function(luhn_string) {
      return Luhn.checksum(luhn_string, 'odd') % 10 == 0;
    },

    generate: function(size, prefix) {
      var generated = prefix || '',
          target_size = size - generated.length - 1;
      for (var i=0; i < target_size; i++) {
        var r = Luhn.getRandom();
        generated += r;
      }
      return generated + Luhn.controlDigit(generated);
    },
    
    checksum: function(value, compare_method) {
      var compare_method = compare_method,
          regexp = new RegExp(/[\d]/g),
          sum = 0;
      value.split('').reverse().join('').replace(regexp, function(match, i, original) {
        var num = parseInt(match, 10),
            weigth;
        if (compare_method === 'even') {
          weight = ((i % 2) === 0) ? num * 2 : num;
        } else {
          weight = ((i % 2) > 0) ? num * 2 : num;
        }
        sum += weight < 10 ? weight : weight - 9
      });
      return sum;
    },

    controlDigit: function(value) {
      var digit = 10 - Luhn.checksum(value, 'even') % 10;
      if (digit === 10) {
        digit = 0;
      }
      return digit;
    },

    getRandom: function() {
      return Math.floor(Math.random() * 9);
    }
  };
  
  Luhn.CivicNumber = function(string) {
    
    var CivicNumber = function(string) {
      this.civic_number = cleanup_string(string);
    };
    
    CivicNumber.prototype.valid = function() {
      return this.civic_number.length == 10 && this.validDate() && Luhn.valid(this.civic_number);
    };
    
    CivicNumber.prototype.digit = function() {
      return Luhn.controlDigit(this.civic_number.substr(0, this.civic_number.length-1));
    };
    
    CivicNumber.prototype.sex = function() {
      if (this.valid()) {
        return (parseInt(this.civic_number.substr(8, 1), 10) % 2 == 0 ? 'female' : 'male');
      } else {
        return 'unknown';
      }
    };
    
    CivicNumber.prototype.validDate = function() {
      var date = this.birthDate();
      return (date.month > 0 && date.month < 12) && (date.day > 0 && date.day < 32);
    };
    
    CivicNumber.prototype.birthDate = function() {
      return {
        year:  parseInt(this.civic_number.slice(0, 2), 10),
        month: parseInt(this.civic_number.slice(2, 4), 10),
        day:   parseInt(this.civic_number.slice(4, 6), 10)
      };
    };

    function cleanup_string(string) {
      string = string.replace(new RegExp(/\D+/g), '');
      return (string.length == 12 ? string.substr(2) : string);
    }
    
    return new CivicNumber(string);
  };

  if (!(Luhn in window)) {
    window['Luhn'] = Luhn;
  }
}).call(this);
