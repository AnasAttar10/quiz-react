import { Button, MenuItem, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Categories from "../../Data/json";
import "./Home.css";

const Home = ({Select_Data_From_Home_Comp}) => {
  const [category , setCategory] = useState('');
  const [difficulty , setDifficulty] = useState('');
  const [name , setName] = useState('');

const Navigate = useNavigate(); 

const Goto_quiz = () => {

  if(!name || !category || !difficulty){


alert('plz input your info')

  }else{
    Select_Data_From_Home_Comp(name , category ,difficulty );

     let path= "/quiz";
     Navigate(path);

    }

  };


  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>  Business College Quiz </span>
        <div className="settings__select">

            
          <TextField
            style={{ marginBottom: 25 }}
            label="اسم الطالب"
            value={name}
            name ={name}
            variant="outlined"
            onChange={(e) => setName(e.target.value)}

          />
          <TextField
            select
            label="اختر مادة"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.value} value={cat.category}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="صعوبة الامتحان "
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            <MenuItem key="Easy" value="easy">
              سهل
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              متوسط 
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              صعب 
            </MenuItem>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={Goto_quiz}
          >
            ابدا الامتحان
          </Button>
        </div>
      </div>
    </div>
  );
  
};


export default Home;


