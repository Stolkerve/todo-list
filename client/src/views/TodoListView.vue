<template>
  <v-container>
    <CardComponent>
      <span>
        <v-progress-linear
          color="green accent-3"
          :value="progress()"
        ></v-progress-linear>
        <CardTitleComponent :title="'Tasks'" />
        <v-form v-model="valid" v-on:submit.prevent="onSubmit">
          <v-container class="pb-0 pt-0">
            <v-row>
              <v-col cols="12" mb="4">
                <v-text-field
                  :maxlength="40"
                  v-model="title"
                  label="Task title"
                  :loading="loadingInput.value"
                  :disabled="loadingInput.value"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </span>
    </CardComponent>
    <CardComponent>
      <span>
        <ProgressCircularComponent :loading="loadingTasks" />
        <TasksListComponent :onlyDoneMode="false" />
      </span>
    </CardComponent>

    <CardComponent>
      <span>
          <TasksListComponent :onlyDoneMode="true" />
      </span>
    </CardComponent>
  </v-container>
</template>

<script lang="ts">
//<CreateTaskComponent/>
import { Vue, Component, Prop } from "vue-property-decorator";
import Task from "@/models/Task";
import TaskService from "@/services/TaskService";

import CardTitleComponent from "@/components/CardTitleComponent.vue";
import TasksListComponent from "@/components/TasksListComponent.vue";
import ProgressCircularComponent from "@/components/ProgressCircularComponent.vue";
import CardComponent from "@/components/CardComponent.vue";

import TaskModule from "@/store/TaskModule";
import { getModule } from "vuex-module-decorators";

@Component({
  components: {
    CardTitleComponent,
    TasksListComponent,
    ProgressCircularComponent,
    CardComponent,
  },
})
export default class TodoListView extends Vue {
  tasks: TaskModule = getModule(TaskModule);
  valid: boolean = false;
  loadingTasks: boolean = true;
  title: string = "";
  loadingInput: any = { value: false };
  loadingTitle: any = { disable: false, value: false };
  loadingDelete: any = { value: false };
  loadingDone: any = { value: false };
  loadingCreate: any = { value: false };
  //titleRules: Array<any> = [(v:any)=> !!v || "Title is required"];

  getCountFinishedTasks(): number {
    return this.tasks.getTasks.filter((t) => t.done && !t.deleted).length;
  }

  getCountNonDeletedTasks(): number {
    return this.tasks.getTasks.filter((t) => !t.deleted).length;
  }

  progress(): number {
    return (
      (this.getCountFinishedTasks() / this.getCountNonDeletedTasks()) * 100
    );
  }

  async onSubmit() {
    if (this.title != "") {
      // Send the task to the backend
      this.loadingInput.value = true;
      const a = new Date();
      const updatedTask: Task | undefined = await TaskService.postTask({
        title: this.title,
        created: new Date(),
      });
      if (updatedTask) {
        updatedTask.canEdit = false;
        this.tasks.addTask(updatedTask);
      } else {
      }
      this.loadingInput.value = false;

      // Clean the input field
      this.title = "";
    }
  }

  async created() {
    if (!this.tasks.getTasks.length) {
      const data = await TaskService.getTask();
      if (data) this.tasks.setTasks(data);
    }
    this.loadingTasks = false;
  }
}
</script>