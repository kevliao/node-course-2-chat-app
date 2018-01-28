var expect = require('expect');


var {generateMessage} = require('./message');

describe('generateMessage', ()=>{
    it('it should generate correct message object', ()=>{   // synchronoous test, so no 'done' needed
        var res = generateMessage('KL', 'hello');

        // making assertions about results that come back
        expect(res.from).toBe('KL');
        expect(res.text).toBe('hello');
        //expect(res.createdAt).toBeA('number');  // type of number, doesn't work??
    })
})