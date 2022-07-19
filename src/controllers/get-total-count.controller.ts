import {post, requestBody} from '@loopback/rest';

// defining the schema of the request object
interface LstNumbers {
  numbers: string;
}

export class GetTotalCountController {
  @post('/getTotalCount')
  rawBodyPost(
    @requestBody({
      description: 'Get the total count of list of numbers',
      required: true,
      content: {
        'application/json': {       // content type to be json
          'x-parser': 'raw',
          schema: {type: 'object'},
        },
      },
    }) body: Buffer
  ) {
    const JsonReq:LstNumbers = JSON.parse(body.toString('utf8'));     //parsing the json response from raw data
    const nums:string[] = JsonReq.numbers.split(",");     //splitting the string to array of strings of numbers
    let total:number = 0;
    nums.forEach(element => {   //iterating through the array to and adding the number to 'total' variable
      total+=Number(element);
    });
    return {total}    //return JSON response
  }
}
