const { category}=require("../models/categry.model");

async function createCategory(params,callback){
    if(!params.categoryName){
        return callback({
            message:"Category Name Require"
        }, "");
    }

    const model=new category(params);
    model.save()
    .then((response)=>{
        return callback(null , response);
    }).catch((error)=>{
        return callback(error);
    });

}

async function getCategories(params,callback){
    const categoryName=params.categoryName;
    var condition=categoryName?{
        categoryName:{$regex:new RegExp(categoryName), $options:"i"}
    }:{};
    let perPage= Math.abs(params.pageSize)|| MONGO_DB_CONFIG.pageSize;
    let pege = (Math.abs(params.page)||1)-1;

    category
    .find(  condition, " categoryName categoryImage")
    .limit(perPage)
    .skip(perPage * pege)
    .then((response)=>{
        return callback(null , response);
    }).catch((error)=>{
        return callback(error);
    });
}

async function getCategoryById(params,callback){
    const categoryId= params.categoryId;
 
    category
    .findById( categoryId)

    .then((response)=>{
        if(!response)callback("Not found category with id " + categoryId);
       
        else callback(null , response);
    }).catch((error)=>{
        return callback(error);
    });
}
async function updateCategory(params,callback){
    const categoryId=params.categoryId;
 
    category
    .findByIdAndUpdate( categoryId , params ,{useFindAndModify:false})

    .then((response)=>{
        if(!response)callback("not found category with id " + categoryId);
       
        else callback(null , response);
    }).catch((error)=>{
        return callback(error);
    });
}

async function deleteCategory(params,callback){
    const categoryId=params.categoryId;
 
    category
    .findByIdAndDelete( categoryId)

    .then((response)=>{
        if(!response)callback("not found category with id " + categoryId);
       
        else callback(null , response);
    }).catch((error)=>{
        return callback(error);
    });
}