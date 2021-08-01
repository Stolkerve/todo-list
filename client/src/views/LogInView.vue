<template>
  <v-container>
    <CardComponent>
      <span v-on:keydown="onKeydown">
        <CardTitleComponent :title="'Log In'" />
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container class="pt-0 pb-0">
            <v-text-field
              :rules="emailRules"
              :maxlength="254"
              :error="error"
              v-model="email"
              label="E-Mail"
              required
            >
            </v-text-field>
            <v-text-field
              :maxlength="64"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              :error="error"
              v-model="password"
              label="Password"
              hint=""
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-container>
        </v-form>
        <ProgressCircularComponent :loading="wait" />
        <v-expand-transition>
          <div v-show="error">
            <v-container class="font-weight-bold">
              <p class="ma-0 red--text">
                The email or the password is incorrect.
              </p>
            </v-container>
          </div>
        </v-expand-transition>
      </span>
    </CardComponent>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import CardTitleComponent from "@/components/CardTitleComponent.vue";
import ProgressCircularComponent from "@/components/ProgressCircularComponent.vue";
import CardComponent from "@/components/CardComponent.vue";

import AuthService from "@/services/AuthService";
import router from "@/router";
import UserModule, { userModule } from "@/store/UserModule";
@Component({
  components: {
    CardTitleComponent,
    ProgressCircularComponent,
    CardComponent,
  },
})
export default class LogInView extends Vue {
  valid: boolean = true;
  email = "";
  password: string = "";
  showPassword: boolean = false;
  wait: boolean = false;
  error: boolean = false;
  userModule:UserModule = userModule;
  emailRules: any = [
    (v: any) => !!v || "E-mail is required",
    (v: any) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  ];
  passwordRules: any = [
    (value: any) => !!value || "Min 8 characters.",
    (v: any) => v.length >= 8 || "Min 8 characters",
  ];

  onKeydown(event: any) {
    if (event.keyCode === 13) {
      this.error = false;
      if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
        this.onSubmit();
      }
    }
  }

  async onSubmit() {
    this.wait = true;
    this.error = !(await AuthService.login({
      email: this.email,
      password: this.password,
    }));
    if (!this.error) {
      this.wait = false;
      router.push(`/todo-list}`);
    }
    this.wait = false;
  }

  reset() {
    this.$refs.form; //.reset()
  }
  resetValidation() {
    this.$refs.form; //.resetValidation()
  }
}
</script>