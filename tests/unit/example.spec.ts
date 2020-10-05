
import Vue from 'vue'
import Vuetify from 'vuetify'
import HelloWorld from '@/components/HelloWorld.vue'
import detail from '@/components/detail.vue'
import { FetchMockStatic } from 'fetch-mock'
const fetchMock: FetchMockStatic = require('node-fetch')
import fstore from "@/store/modules/fruitstore";
const sstore = new Vuex.Store({ modules: { myModule: fstore } })
Vue.use(Vuetify)
import Vuex from 'vuex'

import {
  mount,
  createLocalVue
} from '@vue/test-utils'

const $route = {
  path: '/detail/:id',
  params: {
    id: 3
  }
}

const localVue = createLocalVue()
localVue.use(Vuex)

describe('detail.vue', () => {
  let vuetify: typeof Vuetify
  // @ts-ignore
  global.fetch = fetchMock;
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  it('renders data ', () => {
    const wrapper = mount(detail, {
      // sstore,
      localVue,
      vuetify,
      mocks: {
        $route
      }
      // stubs: ['router-link', 'router-view']
    })


   // wrapper.vm.$nextTick(() => {
  //    expect(wrapper.html()).toMatchSnapshot();
setTimeout(findsomething,2000, wrapper);

  //  })

  })
})

function findsomething(wrapper:any)
{
  const title = wrapper.find('.headline');
  expect(title.text()).toMatch("banana");
}

describe('HelloWorld.vue', () => {
  let vuetify: typeof Vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('should have a custom title ', () => {
    const wrapper = mount(HelloWorld, {
      localVue,
      vuetify,
      // propsData: {
      //   title: 'Foobar',
      // },
    })

    // checking the text content
    const title = wrapper.find('.display-2')
    //console.log(title)
    expect(title.text()).toBe("Welcome to Fruits with Vuetify")
  })


})
