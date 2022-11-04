var sanPhamSer = new SanPhamService();

//Hàm rút gọn cú pháp document.getElements..
function getELE(id){
    return document.getElementById(id);
}

getListProducts();
function getListProducts(){
    sanPhamSer.layDSSP()
    .then(function(result){
        console.log(result.data);
        renderTable(result.data);
        setLocalStorage(result.data);
    })
    .catch(function(error){
        console.log(error);
    });
}
function setLocalStorage(mangSP){
    localStorage.setItem("DSSP",JSON.stringify(mangSP));
}

//Gắn sự kiện click cho button search
getELE("basic-addon2").addEventListener("click",function(){
    var mangSP = getLocalStorage();
    var mangTK = [];
    console.log(mangSP);

    var chuoiTK = getELE("inputTK").value;
    
    mangTK = sanPhamSer.timKiemSP(mangSP,chuoiTK);

    console.log(mangTK);
    renderTable(mangTK);

});

function getLocalStorage(){
    var mangKQ = JSON.parse(localStorage.getItem("DSSP"));
    return mangKQ
}


getELE("btnThemSP").addEventListener("click",function(){
    var footerEle = document.querySelector(".modal-footer");
    footerEle.innerHTML = `
        <button onclick="addProducts()" class="btn btn-success">Add Product</button>
    `;
});

function renderTable(mangSP){
    var content = "";
    var count = 1;
    mangSP.map(function(sp,index){
        content += `
            <tr>
                <td>${count}</td>
                <td>${sp.tenSP}</td>
                <td>${sp.price}</td>
                <td> <img src="${sp.img}" alt="" style="width:100px; height:100px"> </td>
                <td>${sp.desc}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSP('${sp.id}')">Xóa</button>
                    <button class="btn btn-info" onclick="xemSP('${sp.id}')">Xem</button>
                </td>
            </tr>
        `;
        count++;
        console.log(sp.image)
    });
    getELE("tblDanhSachSP").innerHTML = content;
}

function addProducts(){
    //B1: Lấy thông tin(info) từ form
    // data, info
    var tenSP = getELE("TenSP").value;
    var gia = getELE("GiaSP").value;
    var hinhAnh = getELE("HinhSP").value;
    var moTa = getELE("MoTa").value;
    var type = getELE("type").value;

    var sp = new SanPham(
        tenSP,
        gia, 
        hinhAnh,
        moTa, 
        type);
    console.log(sp);

    //B2: lưu info xuống database(cơ sở dữ liệu)
    sanPhamSer.themSP(sp)
    .then(function(result){
        //Load lại danh sách sau khi thêm thành công      
         getListProducts();

         //gọi sự kiên click có sẵn của close button
         //Để tắt modal khi thêm thành công
         document.querySelector("#myModal .close").click();
    })
    .catch(function(error){
        console.log(error);
    });


}

function xoaSP(id){
    sanPhamSer.xoaSanPham(id)
    .then(function(result){
        //Load lại danh sách sau khi xóa thành công      
         getListProducts();
        
    })
    .catch(function(error){
        console.log(error);
    });

}

function xemSP(id){
    sanPhamSer.xemSanPham(id)
    .then(function(result){
        console.log(result.data);
        //Mở modal 
        $('#myModal').modal('show');
        //Điền thông tin lên form
        getELE("TenSP").value  = result.data.tenSP;
        getELE("GiaSP").value = result.data.price
        getELE("HinhSP").value = result.data.img;
        getELE("MoTa").value = result.data.desc;
        getELE("type").value = result.data.type;

        //Thêm button cập nhật cho form
        var footerEle = document.querySelector(".modal-footer");
        footerEle.innerHTML = `
            <button onclick="capNhatSP('${result.data.id}')" class="btn btn-success">Update Product</button>
        `;

    })
    .catch(function(error){
        console.log(error);
    });

}

function capNhatSP(id){
    //B1: Lấy thông tin(info) từ form
    var tenSP = getELE("TenSP").value;
    var gia = getELE("GiaSP").value;
    var hinhAnh = getELE("HinhSP").value;
    var moTa = getELE("MoTa").value;
    var type = getELE("type").value;

    var sp = new SanPham(tenSP,gia,hinhAnh,moTa,type);
    console.log(sp);

    //B2: Cập nhật thông tin mới xuống DB
    sanPhamSer.capNhatSanPham(id,sp)
    .then(function(result){
        console.log(result.data);
        //Load lại danh sách sau khi cập nhật thành công      
         getListProducts();

         //gọi sự kiên click có sẵn của close button
         //Để tắt modal khi cập nhật thành công
         document.querySelector("#myModal .close").click();
    })
    .catch(function(error){
        console.log(error);
    });

}