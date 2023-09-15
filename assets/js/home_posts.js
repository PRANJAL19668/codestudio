//creating a  function for sending post.
//method to submit the form data for new Post into AJAX.
{
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){ //e stands for event
            //whenver,i want to submit the form,i dont want to submit it automatically, we will do preventDefault() in it.
            e.preventDefault();
            //manually submit
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    console.log(data);
                },error: function(error){
                    console.log(error.responseText);
                }

            });
        });
    }
}
//METHOD TO CREATE A POST USING DOM. 
createPost();