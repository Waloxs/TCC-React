const Notify = ({notify}) => {


  console.log(notify);

  return (
    <>
      {notify && notify.length > 0 ? (
        <div style={{background: '#3B82F6', width: '10px', height: '10px', borderRadius: '50%'}}></div>
      ) : (
        <div style={{background: 'transparent', width: '10px', height: '10px', borderRadius: '50%'}}></div>
      )}
    </>
  );
  
};

export default Notify;
