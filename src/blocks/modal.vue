<template>
  <main>
    <a-modal
      v-model:visible="visible"
      title="文章发布设置"
      @ok="submit(formRecord)"
      :okButtonProps="okButtonProps"
    >
      <a-form layout="vertical" :model="formRecord" :rules="rules">
        <a-form-item name="title">
          <a-input v-model:value="formRecord.title" placeholder="标题">
            <template #prefix><EditOutlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model:value="formRecord.synopsis" placeholder="简介">
            <template #prefix><ContainerOutlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-radio-group v-model:value="formRecord.type">
            <a-radio value="blog">日志</a-radio>
            <a-radio value="book">读书</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </main>
</template>

<script>
import { Modal, Radio } from "ant-design-vue";
import { computed, reactive, toRaw } from "vue";
import { EditOutlined, ContainerOutlined } from "@ant-design/icons-vue";
import { useState } from "@/use/hooks.js";
import { useSuccessNotice } from "@/use/notice";
export default {
  // props:{
  //   visible:{
  //     type:Boolean,
  //     default:true,
  //   }
  // },
  components: {
    AModal: Modal,
    EditOutlined,
    ContainerOutlined,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
  },

  setup(props, { emit }) {
    // 弹出发布提示框
    const [visible, setVisible] = useState(false);

    const formRecord = reactive({
      title: "",
      synopsis: "",
      type: "blog",
    });

    const rules = reactive({
      title: [
        {
          required: true,
          trigger: "blur",
          message: "标题为必填项",
        },
      ],
    });

    const okButtonProps = reactive({
      disabled: true,
      loading:false
    });

    // 标题为空时  禁用“确认”发布文章按钮
    okButtonProps.disabled = computed(() => formRecord.title === "");

    // const submit = (record) => {
    //   setVisible(false);
    //   useSuccessNotice({
    //     message: "发布成功",
    //   });
    //   console.log(toRaw(record));
    // };

    const submit = (record) => {
      emit("submit", record);
      // console.log(toRaw(record));
    };

    
    return {
      visible,
      setVisible,
      formRecord,
      submit,
      rules,
      okButtonProps,
    };
  },
};
</script>

<style>
</style>