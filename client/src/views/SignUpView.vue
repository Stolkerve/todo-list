<template>
  <v-container>
    <CardComponent>
      <span v-on:keydown="onKeydown">
        <CardTitleComponent :title="'Sign Up'" />
        <v-form
          ref="form"
          v-model="valid"
          v-on:submit.prevent="onSubmit"
          lazy-validation
        >
          <v-container class="pt-0 pb-0">
            <v-text-field
              :maxlength="30"
              :rules="nameRules"
              :error="errorUser"
              v-model="userName"
              label="Username"
              required
            >
            </v-text-field>
            <v-text-field
              :rules="emailRules"
              :maxlength="254"
              :error="errorEmail"
              v-model="email"
              label="E-Mail"
              required
            >
            </v-text-field>
            <v-text-field
              v-model="password"
              :maxlength="64"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              hint=""
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-container>
        </v-form>
        <ProgressCircularComponent :loading="wait" />
        <v-expand-transition>
          <div v-show="errorUser">
            <v-container class="font-weight-bold">
              <p class="ma-0 red--text">The username already exist.</p>
            </v-container>
          </div>
        </v-expand-transition>
        <v-expand-transition>
          <div v-show="errorEmail">
            <v-container class="font-weight-bold">
              <p class="ma-0 red--text">The email addres already exist.</p>
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

@Component({
  components: {
    CardTitleComponent,
    ProgressCircularComponent,
    CardComponent,
  },
})
export default class SignUpView extends Vue {
  valid: boolean = true;
  showPassword: boolean = false;
  errorUser: boolean = false;
  errorEmail: boolean = false;
  errorAddingUser?: boolean;
  wait: boolean = false;
  userName: string = "";
  email: string = "";
  password: string = "";

  // Rules
  nameRules: any = [(v: any) => !!v || "Name is required"];
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
      this.errorUser = false;
      this.errorEmail = false;
      if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
        this.onSubmit();
      }
    }
  }

  async onSubmit() {
    this.wait = true;
    const res = await AuthService.existUser({
      username: this.userName,
      email: this.email,
    });
    this.errorUser = res.existUser;
    this.errorEmail = res.existEmail;
    if (!this.errorUser && !this.errorEmail) {
      this.errorAddingUser = await AuthService.addUser({
        username: this.userName,
        email: this.email,
        password: this.password,
        created: new Date(),
      });
      if (!this.errorAddingUser) {
        this.wait = false;
        router.push("/login");
      } else {
        // error
      }
    } else {
      this.wait = false;
    }
  }

  validate(): any {
    return (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  resetValidation() {
    this.$refs.form; //.resetValidation()
  }
}
</script>