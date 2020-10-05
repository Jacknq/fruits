<template>
  <v-container>
    <v-row class="text-center">
      <v-card v-if="fruit!=null" class="mx-auto" max-width="800" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">{{fruit.taste}}</div>
            <v-list-item-title class="headline mb-1">{{fruit.name}}</v-list-item-title>
            <v-list-item-title class="headline mb-1">{{fruit.price}}</v-list-item-title>
            <v-card-text>
              <div class="text--primary">{{fruit.description}}</div>
            </v-card-text>
          </v-list-item-content>

          <v-img width="60" :src="fruit.image"></v-img>
        </v-list-item>

        <v-card-actions>
          <v-btn @click="back" text>Back</v-btn>
          
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Fruit } from "@/store/domain/domain";
import { getModule } from "vuex-module-decorators";
import FruitStore from "@/store/modules/fruitstore";

const fruitstoreState = getModule(FruitStore);

@Component({
  components: {},
})
export default class detail extends Vue {
  public get fruit(): Fruit|null {
    if (this.$route.params["id"] != null) {
     // console.log('got id,length'+this.fruits.length);
      var found: Fruit|undefined = this.fruits.find(
        (f) => f.id.toString() == this.$route.params["id"]
      );
      if (found) {
        return found;
      }
     
    }
     //console.log('detail.nodata found');    
    return null;
  }
  public get fruits(): Array<Fruit> {
    return fruitstoreState.fruits;
  }

  created() {
    fruitstoreState.getfruits();
  }
  back() {
    this.$router.go(-1);
  }
}
</script>