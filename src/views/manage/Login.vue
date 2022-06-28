<template>
  <main class="login">
    <a-form
      class="login-form shadow"
      layout="vertical"
      :model="formRecord"
      :rules="rules"
      @submit="submitHandler"
    >
      <a-form-item class="item" name="username">
        <a-input v-model:value="formRecord.username" placeholder="Username">
          <template #prefix><UserOutlined /></template>
        </a-input>
      </a-form-item>
      <a-form-item class="item" name="password">
        <a-input
          v-model:value="formRecord.password"
          type="password"
          placeholder="Password"
        >
          <template #prefix><LockOutlined /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button block type="primary" html-type="submit" :disabled="disabled">
          Log in
        </a-button>
      </a-form-item>
    </a-form>
  </main>
</template>
<script>
import { useLocalStorage } from "@/use/local-storage.js";
import { useErrorNotice, useSuccessNotice } from "@/use/notice.js";
import { useRouterPathToPage } from "@/use/router.js";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { computed, defineComponent, reactive } from "vue";
// import { useForm } from "@ant-design-vue/use";
import http from "../../use/http.js";
export default defineComponent({
  setup() {
    const formRecord = reactive({
      username: "",
      password: "",
    });

    const [token] = useLocalStorage("token");
    // console.log(useLocalStorage("token"))
    const toArticlePage = useRouterPathToPage("/manage/article/1");
    // toRaw方法是把被reactive或readonly后的Proxy对象转换为原来的target对象
    const submitHandler = async () => {
      // console.log(toRaw(formRecord));
      try {
        const res = await http.post("/users/login", formRecord);
        token.value = res.data.token;
        // console.log("res", res);
        useSuccessNotice({
          message: "登录成功",
          duration: 0.5,
        });
        setTimeout(toArticlePage, 500);
        // setTimeout(() => {
        //   toArticle();
        // }, 500);
      } catch (error) {
        // console.log(error)
        useErrorNotice({
          message: "登录失败",
          description: error.reason || "未知错误",
          duration: 2,
        });
      }
    };

    // 用户密码校验规则
    const rules = reactive({
      username: [
        {
          required: true,
          message: "username为必填项",
        },
      ],
      password: [
        {
          required: true,
          pattern: /^(?=.*[a-z])(?=.*[a-z])(?=.*\d)[^]{8,16}$/,
          message: "password为必填项,格式为两个小写字母开头,至少8位至多16位",
        },
      ],
    });

    // const { validateInfos } = useForm(formRecord,rules);

    // 登录按钮是否可用的验证规则
    const disabled = computed(() => {
      // console.log("username:", validateInfos.username.validateStatus);
      // console.log("password:", validateInfos.password.validateStatus);
      // console.log("username",validateInfos.username.validateStatus)
      // console.log("password",validateInfos.password.validateStatus)
      // const status = [
      //   validateInfos.username.validateStatus,
      //   validateInfos.password.validateStatus,
      // ].every((status) => status === "success");
      // return !status;
      return formRecord.username === "" || formRecord.password === "";
    });

    return {
      formRecord,
      disabled,
      submitHandler,
      rules,
    };
  },

  components: {
    UserOutlined,
    LockOutlined,
  },
});
</script>

<style scoped>
/* 让登录框在页面居中 */
.login {
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 500px;
  height: 400px;
  padding: 20px;
  background-color: white;
  border: 1px solid #cfd8dc;
  border-radius: 8px;
}
.item {
  margin: 70px 5px;
}
</style>