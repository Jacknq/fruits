import axios from 'axios';
//mande is awesome from @posva
import { mande, defaults } from 'mande'
import { Fruit } from "@/store/domain/domain"


export default class api {
  //can be parametrized in the future fron conf
  url: string = "http://localhost:3000";

  public getfruits() {
    var fruit = axios.get(this.url + '/fruit', {
      // proxy: {
      //     host: 'localhost',
      //     port: 3000
      //     }  
    });
    return fruit;

  }
 
  public getmfru(): Promise<Array<Fruit>> {
    defaults.mode = 'cors';
 //   console.log('getting data');
    return mande(this.url + '/fruit', defaults).get('',
      // { query: { foo: 'a', bar: 'b' } }
    ).catch(function (err) {
      console.log(err)
    }) as Promise<Array<Fruit>>;

  }
  public addfru(item: Fruit) {
    return mande(this.url + '/fruit', defaults).post(item

    ).catch(function (err) {
      console.log(err)
    }) as Promise<Fruit>;
  }
  public delfru(id: string) {
    return mande(this.url + '/fruit/', defaults).delete(id

    ).catch(function (err) {
      console.log(err)
    }) as Promise<void>;
  }

}

