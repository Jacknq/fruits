<template>
  <v-container>
    <v-row class="text-center">
      <hello />
      <v-col class="mb-4">
        <v-data-table
          :headers="headers"
          :items="fruits"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>List</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Fruit</span>
                  </v-card-title>

                  <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.name"
                              label="name"
                              required
                              :rules="strRules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.image"
                              label="Image Path"
                              required
                              :rules="strRules"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.price"
                              label="Price"
                              required
                              :rules="numberRule"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.description"
                              label="description"
                              required
                              :rules="strRules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.taste"
                              label="Taste"
                              required
                              :rules="strRules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="12">
                            <v-menu
                              v-model="menu2"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editedItem.expires"
                                  label="expires"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                  required
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="editedItem.expires" @input="menu2 = false"></v-date-picker>
                            </v-menu>
                          </v-col>

                          <v-col class="d-flex justify-center">
                            <v-color-picker
                              :hide-inputs="true"
                              :hide-mode-switch="true"
                              v-model="editedItem.color"
                            ></v-color-picker>
                          </v-col>
                          <v-col cols="12" md="4">
                            <div class="text--primary">Color</div>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-sheet dark class="pa-4">
                              <pre>{{ getColor }}</pre>
                            </v-sheet>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="detailItem(item)">mdi-eye</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary">Reset</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col class="mb-5" cols="12">
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
          <!-- <v-text-field
        :value="itemsPerPage"
        label="Items per page"
        type="number"
        min="-1"
        max="15"
        @input="itemsPerPage = parseInt($event, 10)"
          ></v-text-field>-->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Fruit } from "@/store/domain/domain";
import { getModule } from "vuex-module-decorators";
import FruitStore from "@/store/modules/fruitstore";
import hello from "@/components/HelloWorld.vue";
import VueRouter from "vue-router";

const fruitstoreState = getModule(FruitStore);

@Component({
  components: { hello },
})
export default class grid extends Vue {
  valid = false;
  strRules = [(v: any) => !!v || "Text is required"];
  numberRule = [
    (v: any) => !!v || "Text is required",
    (v: any) =>
      (!isNaN(parseFloat(v)) && v >= 0 && v <= 999999) ||
      "Number has to be between 0 and 999999",
  ];
  page = 1;
  itemsPerPage = 10;
  public get fruits(): Array<Fruit> {
    return fruitstoreState.fruits;
  }
  //i could setup watch on this one later, if page size dynamic
  pageCount = 1;
  get pageCnt(): number {
    let pcnt = fruitstoreState.count / this.itemsPerPage;
    if (pcnt > 1) {
      this.pageCount = pcnt;
      return pcnt;
    }
    return 1;
  }
  dialog = false;
  colortype = "hex";
  editedItem = new Fruit();
  editedIndex = -1;
  headers = [
    {
      text: "ID",
      align: "start",
      sortable: false,
      value: "id",
    },
    { text: "Name", value: "name" },
    { text: "Price", value: "price" },
    { text: "Taste", value: "taste" },
    { text: "Actions", value: "actions", sortable: false },
  ];
  menu = false;
  modal = false;
  menu2 = false;

  created() {
    fruitstoreState.getfruits();
  
  }
  detailItem(item: Fruit) {
    this.$router.push({ path: `/detail/${item.id}` });
  }
  deleteItem(item: Fruit) {
    fruitstoreState.delfru(item.id.toString());
  }
  close() {
    this.dialog = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, new Fruit());
      this.editedIndex = -1;
    });
  }

  save() {
    if (this.validate()) {
      if (this.editedIndex > -1) {
        //todo edit logic
        // Object.assign(this.fruits[this.editedIndex], this.editedItem);
      } else {
        this.editedItem.color = this.getColor;
        this.editedItem.price = Number.parseFloat(
          this.editedItem.price
        ).toFixed(2);

        fruitstoreState.addfru(this.editedItem);
        this.resetValidation();
        //this.fruits.push(this.editedItem);
      }
      this.close();
    }
  }
  public get getColor() {
    if (typeof this.editedItem.color === "string") return this.editedItem.color;
    return this.editedItem.color[this.colortype];
  }
  formatDate(date: string) {
    if (!date) return null;

    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  }
  parseDate(date: string) {
    if (!date) return null;

    const [month, day, year] = date.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  validate(): boolean {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      return true; // Property 'snackbar' does not exist on type 'CombinedVueInstance<Vue ...
    }
    return false;
  }
  resetValidation() {
    (this.$refs.form as Vue & { reset: () => boolean }).reset();
    (this.$refs.form as Vue & {
      resetValidation: () => boolean;
    }).resetValidation();
  }
}
</script>
<style lang="less" scoped>
// customize style on component level unless its a global thing
.v-btn :hover{
  transform: scale(1.15);
   color: black;
}
</style>