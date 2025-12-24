import { Switch } from 'antd';
import {SunOutlined, MoonOutlined} from '@ant-design/icons';
import "./PokedexHeader.css";


interface HeaderProps {
    title: string;
    onThemaChange: (checked: boolean) => void;
}



export default function PokedexHeader({title, onThemaChange}:HeaderProps) {
    return <div className="header">
        <h1>{title}</h1>
        <div>
            <SunOutlined style={{ fontSize: '24px' }}/>
            <Switch defaultChecked={false} onChange={onThemaChange} />
            <MoonOutlined style={{ fontSize: '24px' }}/>
        </div>
    </div>
}

