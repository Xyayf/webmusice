<template>
    <div class="login">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="手机号" prop="phone">
    <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button :loading="loading" type="primary" @click="submitForm('ruleForm')">提交</el-button>

  </el-form-item>
</el-form>

    </div>
</template>
<script>
import { mapActions } from '@/store/helpers/user'

export default {
  name: 'Login',

  data () {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else {
        if (this.ruleForm.phone !== '') {
          // this.$refs.ruleForm.validateField('password', function (messge) {
          //   alert(messge) //validateField对部分字段进行验证 会再次调用validatePass2
          // })
          var regTel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
          if (!regTel.test(value)) {
            callback(new Error('输入正确的11位手机号'))
          }
        }
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        var regPass = /[0-9A-Za-z~!@#$%^&*._?]{6,18}/
        if (!regPass.test(value)) {
          this.$refs.ruleForm.validateField('phone') // 最后一栏调用这个
          callback(new Error('输入6-18位密码'))
        }
      }
      callback()
    }
    return {
      ruleForm: {
        phone: '',
        password: ''

      },
      rules: {
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]

      },
      loading: false
    }
  },
  methods: {
    submitForm (formName) {
      // 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.login(this.ruleForm).finally(() => {
            this.loading = false
          })
        }
      })
    },
    ...mapActions(['login'])

  }
}
</script>
<style lang="less" scoped>
.login{
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%,-50%);
  padding: 40px 0;
  border-radius: 5px;
  width: 25rem;
  margin: 0 auto;
  background-color: var(--modal-bg-color);

  /deep/ .el-form-item__content{
    width: 12.5rem;
    .el-button{
      width: 100%;
    }
  }
}
</style>
