import { shallowMount } from '@vue/test-utils'
//RUN before this test, separate terminal
// npm run api 
import HelloWorld from '@/components/HelloWorld.vue'
import { Fruit } from "@/store/domain/domain";
import { getModule } from "vuex-module-decorators";
import fstore from "@/store/modules/fruitstore";
import {  FetchMockStatic } from 'fetch-mock'
import './global.d.ts'
//jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox())
const fetchMock: FetchMockStatic = require('node-fetch')
import Vuex from 'vuex'
import {
  mount,
  createLocalVue
} from '@vue/test-utils'
import FruitStore from '@/store/modules/fruitstore';
const Vue = createLocalVue()
Vue.use(Vuex)
//RUN before this test
// npm run api 
const st = getModule(fstore);
const sstore = new Vuex.Store({ modules: { myModule: fstore} })
const factory = () => {
  const store = new Vuex.Store({
    modules: {
      fruitstore: fstore
    }
  })
  return getModule(fstore, store)
}
describe('fruitstore', () => {
  // @ts-ignore
  global.fetch = fetchMock;
  const service = factory()
  beforeEach(() => {
    // @ts-ignore
  //  fetchMock.mockReset()
  
 
  })
  it('has to get a store instance with data', async (done) => {


    
    expect(service).toBeInstanceOf(Object)
    service.getfruits();
    var found: Fruit|undefined = service.fruits.find(
      (f) => f.id.toString() == "2"
    )
    if(found)
    {service.delfru("2");}
   
    setTimeout(checkcount, 2000, service);
   
    done()
  })
})

function checkcount(service:fstore)
{
  var len = service.count;
  expect(len).toBe(len>0);
  expect(len).toBe(len==5);
}
