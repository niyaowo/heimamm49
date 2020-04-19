<template>
  <div class="upload">
    <el-upload
      class="avatar-uploader"
      :class="{updataBorder:type!='video'}"
      :action="uploadUrl"
      name="file"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <div class="video" v-if="type=='video'">
        <video v-if="value" :src="baseUrl+value" controls class="avatar"></video>
        <div v-else class="updata">
          <el-button type="primary">点击上传视频</el-button>
          <div>只能上传视频格式文件</div>
        </div>
      </div>
      <div class="imageType" v-else>
        <img v-if="value" :src="baseUrl+value" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: ["value", "type"],
  data() {
    return {
      // 上传地址
      uploadUrl: process.env.VUE_APP_URL + "/question/upload",
      baseUrl: process.env.VUE_APP_URL + "/"
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      this.$emit("input", res.data.url);
    },
    beforeAvatarUpload(file) {
      if (this.type == "video") {
        const isJPG = file.type === "video/mp4";
        const isLt6M = file.size / 1024 / 1024 < 8;

        if (!isJPG) {
          this.$message.error("上传视频只能是 video 格式!");
        }
        if (!isLt6M) {
          this.$message.error("上传视频大小不能超过 8MB!");
        }
        return isJPG && isLt6M;
      } else {
        const isJPG =
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/gif";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      }
    }
  }
};
</script>

<style lang="less">
.upload {
  .avatar-uploader.updataBorder .el-upload {
    border: 1px dashed #d9d9d9;
  }
  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>