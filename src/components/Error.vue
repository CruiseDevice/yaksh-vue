<template>
    <div>
        <div class="card">
            <div class="card-body">
                <p>{{showSuccessMessage}}</p>
            </div>
        </div>
        <div class="card" v-for='(error, index) in result.error' :key="index">
            <div class="card-header alert-danger">Error No. {{index+1}}</div>
            <div class="card-body">
                <p>The Following error took place: </p>
                <table class="table table-borderless border border-danger table-responsive-sm" width="100%">
                    <col width="30%">
                    <tr class="bg-light">
                        <td><b>Exception Name: </b></td>
                        <td><span class="text-danger">{{error.exception}}</span></td>
                    </tr>
                    <tr>
                        <td><b>Exception Message:</b></td>
                        <td>{{error.message}}</td>
                    </tr>
                    <tr>
                        <td><b>Full Trace:</b></td>
                        <td>{{error.traceback}}</td>
                    </tr>
                    <tr>
                        <td><strong> We tried your code with the following test case:</strong></td>
                        <td>{{error.test_case}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    name: 'Error',
    props: ['result'],
    computed: {
        showSuccessMessage () {
            if (this.result.success) {
                const message = 'Submitted successfully'
                return message
            }
        }
    }
}
</script>