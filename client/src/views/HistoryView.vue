<template>
  <v-container>
    <CardComponent>
      <div class="">
        <CardTitleComponent :title="'History'" />
        <v-container class="text-center" v-if="loadingTasks">
          <v-progress-circular indeterminate color="primary" />
        </v-container>
        <TasksListComponent :onlyDoneMode="true" :historyMode="true" />
      </div>
    </CardComponent>
  </v-container>
</template>

<script lang="ts">
import TaskModule from "@/store/TaskModule";
import TaskService from "@/services/TaskService";

import CardTitleComponent from "@/components/CardTitleComponent.vue";
import TasksListComponent from "@/components/TasksListComponent.vue";
import CardComponent from "@/components/CardComponent.vue";

import { Vue, Component } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

@Component({
  components: {
    CardTitleComponent,
    TasksListComponent,
    CardComponent,
  },
})
export default class HistoryView extends Vue {
  tasks: TaskModule = getModule(TaskModule);
  loadingTasks: boolean = true;

  async created() {
    if (!this.tasks.getTasks.length) {
      const data = await TaskService.getTask();
      if (data) this.tasks.setTasks(data);
    }
    this.loadingTasks = false;
  }
}
</script>
