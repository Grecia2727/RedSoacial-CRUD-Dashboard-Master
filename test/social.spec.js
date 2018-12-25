  describe('ingresar', () => {

    it('debería ser una función: isValidLogin', () => {
      assert.equal(typeof isValidLogin, 'function');  
    });
    it('debería retornar TRUE, al ingresar email(abc@hotmail.com) y password(123456aA$) CORRECTOS', () => {
      assert.equal(isValidLogin('abc@hotmail.com', '123456aA$'),true);
    });
    it('debería retornar FALSE, al ingresar email(abcdefghij) y password(123) INCORRECTOS', () => {
      assert.equal(isValidLogin('abcdefghij', '123'),false);
    });
    

    it('debería ser una función: validationRegisterUser', () => {
      assert.equal(typeof validationRegisterUser, 'function'); 
    });
    it('debería retornar TRUE, al ingresar: nombre, email, password y confirmar password, CORRECTOS', () => {
      assert.equal(validationRegisterUser('Lucero','abc@hotmail.com', '123456aA$', '123456aA$'),true); 
    });
    it('debería retornar FALSE, al ingresar: nombre, email, password y confirmar password, INCORRECTOS', () => {
      assert.equal(validationRegisterUser('name','abcdef', '1234', '1234'),false); 
    });
    

    it('debería ser una función: validationPublicPost', () => {
      assert.equal(typeof validationPublicPost, 'function');  
    });
    it('debería retornar TRUE, al publicar un post', () => {
      assert.equal(validationPublicPost('Estoy publicando un post'),true);
    });
    it('debería retornar FALSE, cuando intentamos publicar un mensaje vacío', () => {
      assert.equal(validationPublicPost(''),false);
    });
    

    it('debería ser una función: isNotEmpty', () => {
      assert.equal(typeof isNotEmpty, 'function');  
    });
    it('debería retornar TRUE, cuando el campo está lleno', () => {
      assert.equal(isNotEmpty('nombre'),true);
    });
    it('debería retornar FALSE, cuando el campo está vacío', () => {
      assert.equal(isNotEmpty(''),false);
    });


    it('debería ser una función: isEmail', () => {
      assert.equal(typeof isEmail, 'function');  
    });
    it('debería retornar TRUE, cuando el EMAIL ingresado es correcto', () => {
      assert.equal(isEmail('carmen@hotmail.com'),true);
    });
    it('debería retornar FALSE, cuando el EMAIL ingresado no es válido', () => {
      assert.equal(isEmail('emailincorrecto'),false);
    });


    it('debería ser una función: equalPassword', () => {
      assert.equal(typeof equalPassword, 'function');  
    });
    it('debería retornar TRUE, cuando los password son iguales', () => {
      assert.equal(equalPassword('password','password'),true);
    });
    it('debería retornar FALSE, cuando los password No coinciden', () => {
      assert.equal(equalPassword('password1','password2'),false);
    });


    it('debería ser una función: miniLenght', () => {
      assert.equal(typeof miniLenght, 'function');  
    });
    it('debería retornar TRUE, cuando el password tiene minimo 6 caracteres', () => {
      assert.equal(miniLenght('password'),true);
    });
    it('debería retornar FALSE, cuando el password tiene menos de 6 caracteres', () => {
      assert.equal(miniLenght('pass'),false);
    });

    
    it('debería ser una función: isMessage', () => {
      assert.equal(typeof isMessage, 'function');  
    });

  });
