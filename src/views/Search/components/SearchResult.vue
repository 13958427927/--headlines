<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败,点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({ path: '/detail', query: { articleId: item.art_id } })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/Api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        // 失败测试
        // if (Math.random() < 0.8) {
        //   throw new Error()
        // }

        const { data } = await getResultsAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        const results = data.data.results
        if (results.length === 0) {
          this.finished = true
        }
        // 保存数据
        // this.results.push( ...data.data.results )
        this.results = [...this.results, ...results]
        // 关闭loading
        this.loading = false
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.result {
  height: calc(100vh - 108px);
  // voerlay和auto用法基本一致
  overflow: auto;
}
</style>
