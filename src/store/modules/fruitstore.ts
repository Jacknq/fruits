import {Module, VuexModule, Mutation, Action, MutationAction} from 'vuex-module-decorators';
import {Fruit} from "@/store/domain/domain"
import api from "@/store/domain/api";
import Store from "../index";

const iapi:api  =new api();
//using latest pattern and dynamic store
@Module({ name: 'fruitstore', 
dynamic:true,
namespaced: true,
store:Store})
export default  class FruitStore extends VuexModule {
  fruits:Fruit[] = [];
  get count() {
    return this.fruits?this.fruits.length:0;
  }

 @Mutation getfruits():void {
   
    iapi.getmfru()
    .then((v: Array<Fruit>) => {
      if (v && v.find((f) => f.isFruit)) {
        let f = v.filter((f: Fruit) => f.isFruit);
        this.fruits = f;
        
      }
    })
    .catch((reason: any) => {
      console.log(reason);
    });
  }
  @Action addfru(item:Fruit):void {
    iapi.addfru(item)
    .then((v: Fruit) => this.getfruits());
  }
  @Action delfru(id:string):void {
    iapi.delfru(id)
      .then(() => this.getfruits());
  }

  // action 'incr' commits mutation 'increment' when done with return value as payload
 // @Action({commit: 'increment'}) incr() {return 5}
  // action 'decr' commits mutation 'decrement' when done with return value as payload
 // @Action({commit: 'decrement'}) decr() {return 5}
}