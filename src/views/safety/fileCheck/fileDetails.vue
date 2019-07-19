<template>
    <div class='ind_monitor'>
        <div class="content">
            <div class="content_top">
                <p class='title'>常规信息</p>
                <div class='con-min'>
                    <div>
                        <label>计算机：</label><span class="right">{{result.hostname}}</span>
                    </div>
                    <div>
                        <label>时间：</label><span >{{result.LogDate}}</span>
                    </div>      
                </div>
                <div class='con-min'>
                    <div>
                        <label>事件来源：</label><span class="right">客户端</span>
                    </div>
                    <div>
                        <label>原因：</label><span >{{result.comment}}</span>
                    </div>
                </div>
                <div class='con-min'>
                    <div><label>严重性：</label><span class="right">中（7）</span></div>
                </div>
            </div>
            <div class="content_middle">
                <p>描述</p>
                <div class='con-min'>
                    <label>文件：</label><span class="right">{{result.Path}}</span>
                </div>  
            </div>
            <div class="bar" v-if="result.md5_before!=''||result.md5_after!=''">
                <el-container>
                    <el-aside width="60px">md5</el-aside>
                    <el-main>
                        <div>
                            <label>旧值：</label><span class="right">{{result.md5_before}}</span>
                        </div>
                        <div>
                            <label>新值：</label><span>{{result.md5_after}}</span>
                        </div>
                    </el-main>
                </el-container>
            </div>
            <div class="bar footer" v-if="result.owner_before!=''||result.owner_after!=''">
                <el-container>
                    <el-aside width="60px" class="size">所有者</el-aside>
                    <el-main>
                        <div>
                            <label>旧值：</label><span class="right">{{result.owner_before}}</span>
                        </div>
                        <div>
                            <label>新值：</label><span >{{result.owner_after}}</span>
                        </div>
                    </el-main>
                </el-container>
            </div>
            <div class="bar footer" v-if="result.gowner_before!=''||result.gowner_after!=''">
                <el-container>
                    <el-aside width="60px">组</el-aside>
                    <el-main>
                        <div>
                            <label>旧值：</label><span class="right">{{result.gowner_before}}</span>
                        </div>
                        <div>
                            <label>新值：</label><span >{{result.gowner_after}}</span>
                        </div>
                    </el-main>
                </el-container>
            </div>
            <div class="bar footer" v-if="result.perm_before!=''||result.perm_after!=''">
                <el-container>
                    <el-aside width="60px">权限</el-aside>
                    <el-main>
                        <div>
                            <label>旧值：</label><span class="right">{{result.perm_before}}</span>
                        </div>
                        <div>
                            <label>新值：</label><span >{{result.perm_after}}</span>
                        </div>
                    </el-main>
                </el-container>
            </div>
            <div class="bar footer" v-if="result.sha1_before!=''||result.sha1_after!=''">
                <el-container>
                    <el-aside width="60px">SHA-1</el-aside>
                    <el-main>
                        <div>
                            <label>旧值：</label><span class="right">{{result.sha1_before}}</span>
                        </div>
                        <div>
                            <label>新值：</label><span >{{result.sha1_after}}</span>
                        </div>
                    </el-main>
                </el-container>
            </div>
            <div class="bar footer" v-if="result.size_before!=''||result.size_after!=''">
                <el-container>
                    <el-aside width="60px">大小</el-aside>
                    <el-main>
                        <div>
                            <label>旧值：</label><span class="right">{{result.size_before}}</span>
                        </div>
                        <div>
                            <label>新值：</label><span >{{result.size_after}}</span>
                        </div>
                    </el-main>
                </el-container>
            </div>
            <div class="content_middle">
                <p>修改内容</p>
                <div class='con-min'>
                    <label>文件：</label><span class="right" v-html="whatchangedLi"></span>
                    <ul>
                        <li></li>
                    </ul>
                </div>  
            </div>
        </div>
    </div>
    
</template>

<script>
import { updateIntegerityEventStatus } from '@/api/safety'
export default {
    data () {
        return {
          IntegrityEventID:'',
          result:'',

          whatchangedName:'',
          whatchangedLi:[],
        }
    },
    created(){
      this.create();
      this.getDetails();
    },
    methods:{
      // 拿到id
      create(){
          let IntegrityEventID = this.$route.params.integrityEventID;
          this.IntegrityEventID = IntegrityEventID;
          console.log(this.IntegrityEventID);
        },
      getDetails(){
        let ser = 'getIntegrityEventById',
            paramStr = '<integrityEventID>'+ this.IntegrityEventID +'</integrityEventID>';
        
        updateIntegerityEventStatus(ser,paramStr).then(res=>{
           console.log(123,res)
           let aa = res.whatchanged
           let aa1 = aa.replace(/---/g,"");
           let arr = aa1.replace(/&lt;/g, "<");
           let arr1 = arr.replace(/&gt;/g, ">");
           this.result = res;
           this.whatchangedLi = arr1;
          
          }).catch( err => {
            console.log('获取存储数据失败', err );
          })
      },
    }

}
</script>



<style lang="scss" scoped="scoped">
    .ind_monitor{
        background: #f6f8fb;
        height:100%;
        .content{
            background:#ffffff;
            padding-bottom:20px;
            padding-left:20px;
            padding-right:20px;
        }
    }   
    .content_top{
            background: #ffffff;
            padding: 20px 20px 10px 20px;
            
            .title{
                font-size:14px;
                position:relative;
                padding-bottom: 20px;
                &::before{
                    display:inline-block;
                    content:'';
                    width:4px;
                    height:15px;
                    background-color:#3ac0f1;
                    margin-right:5px;
                    position: absolute;
                    top: 2px;
                    left: -15px;
                }
            }   
            .con-min{
                line-height:20px;
                padding-bottom: 20px;
                div{
                    display:inline-block;
                    width:480px;
                    margin-left: -15px;
                }
                label{
                    display:inline-block;
                    min-width:30px;
                    font-size:14px;
                }
                span{
                    font-size:12px;
                }
                .right{
                    margin-right:300px;
                }
            } 
        }
    .content_middle{
        margin-top:10px;
        border-top:1px solid #ccc;
        padding: 20px 20px 0 20px;
        p{
            font-size:14px;
            position:relative;
                &::before{
                    display:inline-block;
                    content:'';
                    width:4px;
                    height:15px;
                    background-color:#3ac0f1;
                    margin-right:5px;
                    position: absolute;
                    top: 2px;
                    left: -15px;
                }
        }
        .con-min{
            line-height:40px;
             margin-left: -15px;
            
            label{
                font-size:14px;
            }
            span{
                font-size:12px;
            }
        }
    }
    .bar{
        height:60px;
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
    }
    .footer{
        margin-top:20px;
    }
    .el-aside {
        background-color: #f0f2f7;
        color: #333;
        text-align: center;
        height:60px;
        line-height: 60px;
        font-size:14px;
    }
    .el-main {
        background-color: #fff;
        color: #333;
        padding:0;
        padding-top:10px;
        padding-left:20px;
        height:60px;
        div{
            line-height:20px;
            label{
            font-size:14px;   
        }
        span{
                font-size:12px;
            }
        } 
    }
</style>



