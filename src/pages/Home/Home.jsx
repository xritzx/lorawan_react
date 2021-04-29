import React, { useEffect, useState } from 'react';
import { Layout, Table, Switch, Space, Menu, Dropdown, Button, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';


import './Home.less';
import { http } from '../../services/index';
const { Content } = Layout;


const Home = () => {
    const sort_fields = ['device_time', 'temperature', 'humidity', 'current_pressure', 'baseline_pressure'];

    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [sortField, setSortField] = useState(sort_fields[0]);
    const [sortDirection, setSortDirection] = useState(-1);

    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState({});
    
    const onClick = ({ key }) => {
      setSortField(sort_fields[key]);
    };
    const onChange = (pagination, filters, sorter, extra) => {
      setPerPage(pagination.pageSize);
      setPage(pagination.current);
      console.log('params', pagination, filters, sorter, extra);
    }
    
    // Helper Function
    const prettify = field => field.split('_').map(e=>e.charAt(0).toUpperCase() + e.substring(1,e.length)).join(' ');

    const menu = (fields, onClick) => 
      <Menu onClick={onClick}>
        {fields.map((field, index) => <Menu.Item key={String(index)}>{prettify(field)}</Menu.Item>)}
      </Menu>;

    useEffect(() => {
      (async () => {
        try{
          let data = await http({
            'method': 'POST',
            'url': '/fetch-logs',
            'data': {
              'page': page,
              'per_page': perPage,
              'sort_field': sortField,
              'sort_direction': sortDirection
            }
          });
          setData(data.data.data);
          setTotal(data.data.total);
          setLoaded(true);
        }
        catch(err){
          message.error(`Error: ${err.message}`);
        }
      })();
    },[sortField, sortDirection, page, perPage]);

    
    const columns = (() => {
      const fields = [
        'index',
        'address', 
        'device_time', 
        'server_time', 
        'device_initialized',
        'baseline_mode_selected',
        'no_measurement',
        'baseline_pressure',
        'current_pressure', 
        'temperature', 
        'humidity', 
      ];
        let cols = [];
        fields.forEach(e => {
          cols.push({
            title: prettify(e),
            dataIndex: e,
            key: e,
            render: val => typeof val === 'boolean'? val? "✅": "" : val
          });
        });
        return cols;
      }
    )();
    
    return (
        <Layout>
            <Layout.Header className="header">
                Woosh Air
            </Layout.Header>
            <Layout>
                <Content style={{ padding: '50px 10%' }}>
                  <Space>
                    <Dropdown overlay={menu(sort_fields ,onClick)}>
                      <Button>
                        Sorted: {prettify(sortField)} <DownOutlined/>
                      </Button>
                    </Dropdown>
                    <Switch 
                      checkedChildren="Decending"
                      unCheckedChildren="Ascending"
                      onChange={()=>setSortDirection(-1*sortDirection)}
                      defaultChecked
                    />
                  </Space>
                  <br/><br/>
                  {
                    loaded?
                      <Table 
                        columns={columns}
                        dataSource={data}
                        onChange={onChange}
                        pagination={{
                          total: total,
                          showSizeChanger: true,
                          defaultPageSize: perPage,
                          pageSizeOptions: ["5", "25", "100", "250"],
                          position: ["bottomLeft"]
                        }}
                      />
                    
                      :<h3>Loading...</h3>
                  }
                 
                </Content>
            </Layout>
        </Layout>
    );
}

export default Home;