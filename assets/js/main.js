$("table").rtResponsiveTables();

$("#add_drug").submit(function (event) {
  event.preventDefault();

  const drugName = $("#name").val();

  $.ajax({
    url: "/api/drugs",
    method: "POST",
    data: $("#add_drug").serialize(),
    success: function (response) {
      alert(drugName + " sent successfully!");
      console.log("API response:", response);
      $("#add_drug")[0].reset();
    },
    error: function (err) {
      console.error("Error adding drug:", err);
      alert("Failed to add drug: " + err.responseJSON.message);
    },
  });
});

$("#update_drug").submit(function (event) {
  event.preventDefault();

  var unindexed_array = $("#update_drug");
  var unindexed_array = $(this).serializeArray();
  var data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  var request = {
    url: `api/drugs/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert(data.name + " Updated Successfully!");
    window.location.href = "/manage";
  });
});

if (window.location.pathname == "/manage") {
  $ondelete = $("table tbody td a.delete");
  $ondelete.click(function () {
    let id = $(this).attr("data-id");

    let request = {
      url: `api/drugs/${id}`,
      method: "DELETE",
    };

    if (confirm("Do you really want to delete this drug?")) {
      $.ajax(request).done(function (response) {
        alert("Drug deleted Successfully!");
        location.reload();
      });
    }
  });
}

if (window.location.pathname == "/purchase") {
  $("#purchase_table").hide();

  $("#drug_days").submit(function (event) {
    event.preventDefault();
    $("#purchase_table").show();
    const days = +$("#days").val();
    alert("Drugs for " + days + " days!");
  });
}