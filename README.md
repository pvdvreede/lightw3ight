# lightw3ight

*Production k3s clusters with slightly less master availablity (than some other k8s clusters).*

Lightw3ight uses the new [k3s.io](k3s.io) project to spin up a full production grade Kubernetes cluster in AWS using EC2. It is production grade for running workloads, and those workloads (if architected properly) can themselves be highly available (HA), however the Kubernetes master/API for this cluster may have short outages during upgrades or hardware failures. In most situations this should be totally fine as the nodes will continue to run applications during the master's outage, and will just reconnect when it comes back.

## Uses

k3s.io has a list of possible purposes on its website [here](https://github.com/rancher/k3s/blob/master/README.md#k3s---5-less-than-k8s), but here are some reasons why you might want to run it specifically in AWS:

* Reduced cost: given there is a single master you can run the control plane for far less than an AWS EKS control plane (depending on the instance size). An AWS EKS control plane costs $0.20 per hour. Compare this to running the master on a t3.medium which is $0.06 per hour. Given Lightw3ight uses an ASG with reconnecting ENI and EBS volume, the master should still self heal and need minimal maintenance.
* Development/Demo clusters: provide a simple cluster that spins up relatively quickly to be able to test certain Kubernetes features, or deploy manifests.
* Manage and operate several clusters to spread the risk without having to trade off more people to manage them all. Lightw3ight tries to simplify the components in line with k3s so there is less management for each cluster.

## TODO

* Implement optional DLM lifecycle for the EBS volume to automate backups, then add optional snapshot ID to template so that a cluster can be restored/duplicated easily.
* Re-add Traefik and setup with NLB to add a built in ingress that is ready to go as part of Lightw3ight.
* Upload template to S3 so that the Cloudformation Web UI can be used to create clusters easily without needing to setup tools or clone this repo.
