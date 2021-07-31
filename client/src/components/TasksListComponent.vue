<template>
  <div>
    <!-- I realase that I can use slots for all its mess -->
    <template v-if="!onlyDoneMode">
      <template v-for="(t, index) in this.tasks.getTasks">
        <template v-if="!t.deleted">
          <v-container v-if="!t.done" v-bind:key="index">
            <v-row>
              <div class="d-flex align-center pl-5">
                <v-checkbox
                  v-on:click="onDone(t.ID, index)"
                  :input-value="t.done"
                  color="info"
                  :indeterminate="loadingDone.value === t.ID"
                  :disabled="loadingDone.value === t.ID"
                ></v-checkbox>
              </div>
              <v-col>
                <template v-if="t.canEdit">
                  <v-form v-on:submit.prevent="onSubmitChangeTitle(t.ID, index)">
                    <v-text-field :loading="loadingTitle.value === t.ID" :disabled="loadingTitle.disable" v-model="t.title" :maxlength="40"></v-text-field>
                  </v-form>
                </template>
                <template v-else>
                  <v-card-title class="pl-1 pb-0">{{t.title}}</v-card-title>
                </template>
                <div class="font-weight-light text-caption">
                  created at {{toTimeStamp(t.created)}}
                </div>
              </v-col>
              <div class="d-flex align-center pr-5">
                <v-btn icon color="blue accent-4" v-on:click="onChangeTitle(t.ID, index)"><v-icon>mdi-pencil</v-icon></v-btn>
              </div>
              <div class="d-flex align-center pr-5">
                <v-btn :loading="loadingDelete.value == t.ID" icon color="red accent-4" v-on:click="onTrash(t.ID, index)"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
              </div>
            </v-row>
            <v-divider style="border-color: rgba(0, 0, 0, 0.42);"></v-divider>
          </v-container>
        </template>
      </template>
    </template>
    <template v-else-if="historyMode">
      <template v-for="(t, index) in this.tasks.getTasks">
        <template v-if="t.deleted">
          <v-container v-bind:key="index">
            <v-row>
              <div class="d-flex align-center pl-5">
                <v-checkbox
                  disabled
                  :input-value="t.done"
                  color="info"
                ></v-checkbox>
              </div>
              <v-col>
                <v-card-title class="pl-1 pb-0">{{t.title}}</v-card-title>
                <div class="font-weight-light text-caption">
                  {{createdAndFinishedAt(t.id, index)}}
                </div>
              </v-col>
              <div class="d-flex align-center pr-5">
                <v-btn :loading="loadingDelete.value == t.ID" icon color="red accent-4" v-on:click="onDelete(t.ID, index)"><v-icon>mdi-close-thick</v-icon></v-btn>
              </div>
            </v-row>
            <v-divider style="border-color: rgba(0, 0, 0, 0.42);"></v-divider>
          </v-container>
        </template>
      </template>
    </template>
    <!-- Finished tasks -->
    <template v-else>
      <template v-for="(t, index) in this.tasks.getTasks">
        <template v-if="t.done && !t.deleted">
          <v-container v-bind:key="index">
            <v-row>
              <div class="d-flex align-center pl-5">
                <v-checkbox
                  v-on:click="onDone(t.ID, index)"
                  :input-value="t.done"
                  color="info"
                  :indeterminate="loadingDone.value === t.ID"
                  :disabled="loadingDone.value === t.ID"
                ></v-checkbox>
              </div>
              <v-col>
                <v-card-title class="pl-1 pb-0">{{t.title}}</v-card-title>
                <div v-show="onlyDoneMode" class="font-weight-light text-caption">
                  finished at {{toTimeStamp(t.finished)}}
                </div>
              </v-col>
              <div class="d-flex align-center pr-5">
                <v-btn :loading="loadingDelete.value == t.ID" icon color="red accent-4" v-on:click="onTrash(t.ID, index)"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
              </div>
            </v-row>
            <v-divider style="border-color: rgba(0, 0, 0, 0.42);"></v-divider>
          </v-container>
        </template>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import {Vue, Prop, Component} from "vue-property-decorator"
import {getModule} from "vuex-module-decorators"
import TaskModule from "@/store/TaskModule"
import Task from "@/models/Task";
import TaskService from "@/services/TaskService";
import {toTimeStamp} from "@/utils/timestamp"

@Component
export default class TasksListComponent extends Vue {
  tasks:TaskModule = getModule(TaskModule);
  loadingInput: any = {value: false};
  loadingTitle: any = {disable: false, value: false};
  loadingDelete: any = {value: false};
  loadingDone: any = {value: false};
  loadingCreate: any = {value: false};

  @Prop({default:false}) onlyDoneMode!:boolean;
  @Prop({default:false}) historyMode!:boolean;

  toTimeStamp(date: Date)
  {
    return toTimeStamp(date);
  }

// EDIT
  async onDone(id:number, index: number) {
    this.tasks.getTasks[index].done = !this.tasks.getTasks[index].done;
    
    this.tasks.getTasks[index].finished = this.tasks.getTasks[index].done ? new Date() : undefined;

    this.loadingDone.value = id;

    await TaskService.updateTask(this.tasks.getTasks[index], id);
    this.tasks.editTask(this.tasks.getTasks[index]);

    this.loadingDone.value = null;
  }

  onChangeTitle(id:number, index: number) {
    this.loadingTitle.disable = false;
    this.tasks.getTasks[index].canEdit = !this.tasks.getTasks[index].canEdit;
  }

  async onSubmitChangeTitle(id:number, index: number) {
    this.loadingTitle.disable = true;
    this.loadingTitle.value = id;

    //this.tasks[index] = await TaskService.updateTask(this.tasks[index], id);
    await TaskService.updateTask(this.tasks.getTasks[index], id)
    this.tasks.editTask(this.tasks.getTasks[index]);

    this.tasks.getTasks[index].canEdit = false;
    this.loadingTitle.value = null;
    this.loadingTitle.disable = false;
  }

  async onTrash(id:number, index: number) {
    this.loadingDelete.value = id;

    this.tasks.getTasks[index].deleted = new Date(Date.now());
    
    await TaskService.updateTask(this.tasks.getTasks[index], id)

    //this.tasks.deleteTask(id);

    this.loadingDelete.value = null;
  }

  createdAndFinishedAt(id: number, index: number) {
    return `created at ${toTimeStamp(this.tasks.getTasks[index].created)} / finished at ${this.tasks.getTasks[index].finished ? toTimeStamp(this.tasks.getTasks[index].finished) : "xxxx/xx/xx"}`;
  }

  async onDelete(id:number, index: number) {
    this.loadingDelete.value = id;

    await TaskService.deleteTask(id);
    this.tasks.deleteTask(id);

    this.loadingDelete.value = null;
  }

}
</script>