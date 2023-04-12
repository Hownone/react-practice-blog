import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select
  } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
//导入富文本编辑器
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '@/store';
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { http } from '@/utils'

const { Option } = Select
  
const Publish = () => {

    //存放上传图片的列表
    const [fileList , setFileList] = useState([]);
    const onUploadChange = (info) => {
        // 经过试验，若这样写，console.log会打印出三次结果
        // upload组件会在上传前、上传中、上传完成三个阶段出发onChange的回调函数,最后一次触发时返回值中有response属性
        // 我们将这个response属性中的data属性中的url值获取到
        // 存储进react的state状态属性fileList中，实现组件属性受控写法
        //console.log(fileList);
        // setFileList(fileList);
        const fileList = info.fileList.map(file => {
            if (file.response) {
              return {
                url: file.response.data.url
              }
            }
            return file
        })
        console.log(fileList);
        setFileList(fileList);
    }

    //切换图片
    const [imgCount,setImageCount] = useState(1);
    const radioChange = (e) => {
        //console.log(e.target.value);
        setImageCount(e.target.value);
    }

    //提交表单
    const onFinish = async (values) => {
        console.log(values);
        /*
        数据的二次处理，重点是处理cover字段
        cover: {
            type: , //表示 选的是无图，单图，还是三图
            images: [] 存放图片的url列表

        }
        */
       const {channel_id,content,title,type} = values;
       const params = {
        channel_id,
        content,
        title,
        type,
        cover: {
            type: type,
            images: [],
            images: fileList.map(item => item.url)
        },
       }
       // console.log(params);
       await http.post('/mp/articles?draft=false',params); //调取后端接口
    }


    const {channelStore} = useStore();
    return (
      <div className="publish">
        <Card
          title={
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link to="/">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>发布文章</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 1 }}
            onFinish={onFinish}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input placeholder="请输入文章标题" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[{ required: true, message: '请选择文章频道' }]}
            >
              <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                {channelStore.channelList.map(item => (
                    <Option key={item.id} value={item.id}> {item.name} </Option>
                ))}
              </Select>
            </Form.Item>
  
            <Form.Item label="封面">
              <Form.Item name="type">
                {/* 看Radio.Group的官方文档 */}
                <Radio.Group onChange={radioChange}> 
                  <Radio value={1}>单图</Radio>
                  <Radio value={3}>三图</Radio>
                  <Radio value={0}>无图</Radio>
                </Radio.Group>
              </Form.Item>
              {/* 只有不是无图选项时才展示上传图片 */}
              {/* 短路逻辑写法 */}
              {imgCount > 0 && (
                 <Upload
                    name="image" //说明是图片上传
                    listType="picture-card"  //上传图片的样式
                    className="avatar-uploader" 
                    showUploadList //上传图片时是否展示选择好的图片列表，加上这个属性表示展示
                    action={"http://geek.itheima.net/v1_0/upload"}  //配置图片的上传接口地址
                    fileList={fileList} // 表示是受控的形式，通过react中的fileList存储图片的列表来控制Upload组件的fileList属性，目的是为了保持与react的数据状态一直
                    onChange={onUploadChange} //当上传列表发生变化的时候执行的回调函数
                    multiple={imgCount > 1}  //当imgCount > 1时支持多图上传
                    maxCount={imgCount} // 最大上传图片
               >
                    <div style={{ marginTop: 8 }}>
                    <PlusOutlined />
                    </div>
               </Upload>
              )}
            </Form.Item>
            {/* 这里的富文本组件 已经被Form.Item控制 */}
            {/* 它的输入内容 会在onFinished回调中收集起来 */}
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
            >
                <ReactQuill className='publish-quill' theme='snow'/>
            </Form.Item>
  
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  发布文章
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
}

export default observer(Publish);