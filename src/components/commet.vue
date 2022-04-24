<template>
  <div class="comment" >
    <div class="img">
      <img :src="comment.avatarUrl" alt="" />
    </div>
    <div class="content">
      <div class="comment-text">
        <p>
          <span class="user_name">{{ comment.nickname }}:</span>
          <span class="text">{{ comment.content }}</span>
        </p>
      </div>
      <div class="beReplied" v-if="comment.beReplied.length">
        <p v-for="(beReplied,index) in comment.beReplied" :key="index">
          <span class="user_name">{{ beReplied.nickname }}:</span>
          <span class="text">{{ beReplied.content }}</span>
        </p>
      </div>
      <div class="footer">
          <span>{{$Utill.formatTimes(comment.time)}}</span>
          <div class="like">
              <Icon type='good' :size="12">
          </Icon>
          <span>{{comment.likedCount}}</span>
          </div>
      </div>

    </div>
  </div>
</template>
<script>

export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      default: () => {}
    }
  }

}
</script>
<style lang="less" scoped>
.img {
  .img-wrap(2.85714rem,2.85714rem);
  margin: 0 0.9375rem;
}
.comment {
  display: flex;
  margin: 1.625rem 0;
  font-size: 12px;
  .content {
    flex: 1;
    .comment-text {
      margin-bottom: 1.2rem;
    }
    .beReplied {
      padding: 5px 10px;
      border-radius: 5px;
      background: var(--song-shallow-grey-bg);
      p {
        line-height: 1.5rem;
      }
    }
    .footer{
        color: var(--font-color-grey-shallow);
        font-size:12px;
        .like{
            float: right;
            span{
                margin: 0 .625rem;
            }
        }

    }
  }
}
.user_name {
  color: #517eaf;
}
</style>
