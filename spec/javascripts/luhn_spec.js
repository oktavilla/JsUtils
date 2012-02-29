describe('Luhn', function() {

  it("identifies if the number is valid", function() {
    expect(Luhn.valid('1111111116')).toBeTruthy();
  });

  it('identifies if the number is invalid', function() {
    expect(Luhn.valid('1111111111')).toBeFalsy();
  });

  it('generate a number string with the size of the argument', function() {
    var luhn_string = Luhn.generate(5);
    expect(luhn_string.length).toEqual(5);
  });

  it('generates a number string that satisfies luhn', function() {
    var luhn_string = Luhn.generate(32);
    expect(Luhn.valid(luhn_string)).toBeTruthy();
  });

  it('generate a a valid luhn with a given prefix', function() {
    var luhn_string = Luhn.generate(10, '00001');
    expect(luhn_string).toMatch(/^00001/);
    expect(Luhn.valid(luhn_string)).toBeTruthy();
  });

  it('calculates the control digit', function() {
    expect(Luhn.controlDigit('111111111')).toEqual(6);
  });
  
  describe('CivicNumber', function() {

    it("identifies if the civic number is valid", function() {
      expect(Luhn.CivicNumber('3910304298').valid()).toBeTruthy();
    });

    it('identifies if the civic number is invalid', function() {
      expect(Luhn.CivicNumber('3910304290').valid()).toBeFalsy();
    });

    it('requires a length of 10 to be valid', function() {
      var luhn_string = Luhn.generate(8, '391030');
      expect(Luhn.CivicNumber(luhn_string).valid()).toBeFalsy();
    });

    it('requires the civic number to be a valid date', function() {
      var luhn_string = Luhn.generate(10, '3999');
      expect(Luhn.CivicNumber(luhn_string).valid()).toBeFalsy();
    });

    it('calculates the control digit(for a valid civic number', function() {
      expect(Luhn.CivicNumber('3910304298').digit()).toEqual(8);
    });

    it('calculates the control digit(for a incomplete civic number', function() {
      expect(Luhn.CivicNumber('3910304290').digit()).toEqual(8);
    });
  
    it('calculates the control digit(for a incomplete civic number', function() {
      expect(Luhn.CivicNumber('3910304290').digit()).toEqual(8);
    });

    it('identifies if the civic number belongs to a male', function() {
      expect(Luhn.CivicNumber('3910304298').sex()).toEqual('male');
    });

    it('identifies if the civic number belongs to a female', function() {
      expect(Luhn.CivicNumber('3910303183').sex()).toEqual('female');
    });
  
    it('cleans up civic number with the full year supplied', function() {
      expect(Luhn.CivicNumber('19391030-3183').civic_number).toEqual('3910303183');
    });

    it('knows the date of birth', function() {
      var birth_date = Luhn.CivicNumber('3001018194').birthDate();
      expect(birth_date.year).toEqual(30);
      expect(birth_date.month).toEqual(1);
      expect(birth_date.day).toEqual(1);
    });
  
    xit('generates a valid random civic number', function() {
      var civic_number = Luhn.CivicNumber.generate();
      expect(Luhn.CivicNumber(civic_number).valid()).toBeTruthy();
    });

  });
});
